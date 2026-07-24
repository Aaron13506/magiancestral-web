import 'dotenv/config'
import { existsSync, readFileSync } from 'fs'
import { extname, resolve } from 'path'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { eq } from 'drizzle-orm'
import { blogArticles, events, products } from '../server/db/schema'
import { uploadFileToS3 } from '../server/utils/s3'

const required = ['DATABASE_URL', 'S3_BUCKET_NAME', 'S3_ACCESS_KEY_ID', 'S3_SECRET_ACCESS_KEY', 'S3_ENDPOINT_URL', 'S3_REGION']
for (const key of required) {
  if (!process.env[key]) throw new Error(`${key} is not set (check your .env file)`)
}

const s3Config = {
  region: process.env.S3_REGION!,
  endpoint: process.env.S3_ENDPOINT_URL!,
  bucketName: process.env.S3_BUCKET_NAME!,
  accessKeyId: process.env.S3_ACCESS_KEY_ID!,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  publicUrlBase: process.env.S3_PUBLIC_URL_BASE
}

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf'
}

const sql = postgres(process.env.DATABASE_URL!, { prepare: false })
const db = drizzle(sql)

// Caches each local path -> its new S3 URL, so a file referenced by
// multiple rows (e.g. the same logo reused across several events) is
// only uploaded once.
const cache = new Map<string, string>()
let uploadedCount = 0
let skippedMissing = 0

async function migratePath(localPath: string | null): Promise<string | null> {
  if (!localPath) return localPath
  if (!localPath.startsWith('/assets/')) return localPath // already migrated / external URL

  if (cache.has(localPath)) return cache.get(localPath)!

  const diskPath = resolve('public' + localPath)
  if (!existsSync(diskPath)) {
    console.warn(`  ! archivo no encontrado en disco, se deja la ruta original: ${localPath}`)
    skippedMissing++
    cache.set(localPath, localPath)
    return localPath
  }

  const ext = extname(diskPath).toLowerCase()
  const contentType = CONTENT_TYPES[ext] || 'application/octet-stream'
  const buffer = readFileSync(diskPath)
  const keyPrefix = ext === '.pdf' ? 'documents' : 'uploads'

  const url = await uploadFileToS3(s3Config, buffer, contentType, diskPath, keyPrefix)
  cache.set(localPath, url)
  uploadedCount++
  console.log(`  ${localPath} -> ${url}`)
  return url
}

async function migrateGallery(gallery: unknown): Promise<string[]> {
  const list = Array.isArray(gallery) ? gallery as string[] : []
  const migrated: string[] = []
  for (const item of list) {
    migrated.push((await migratePath(item)) as string)
  }
  return migrated
}

async function migrateProducts() {
  const rows = await db.select().from(products)
  for (const row of rows) {
    const image = await migratePath(row.image)
    const gallery = await migrateGallery(row.gallery)
    const galleryChanged = JSON.stringify(gallery) !== JSON.stringify(row.gallery || [])
    if (image !== row.image || galleryChanged) {
      await db.update(products).set({ image, gallery, updatedAt: new Date() }).where(eq(products.id, row.id))
    }
  }
  console.log(`Productos revisados: ${rows.length}`)
}

async function migrateBlog() {
  const rows = await db.select().from(blogArticles)
  for (const row of rows) {
    const image = await migratePath(row.image)
    const pdfUrl = await migratePath(row.pdfUrl)
    if (image !== row.image || pdfUrl !== row.pdfUrl) {
      await db.update(blogArticles).set({ image, pdfUrl, updatedAt: new Date() }).where(eq(blogArticles.id, row.id))
    }
  }
  console.log(`Artículos de blog revisados: ${rows.length}`)
}

async function migrateEvents() {
  const rows = await db.select().from(events)
  for (const row of rows) {
    const logo = await migratePath(row.logo)
    if (logo !== row.logo) {
      await db.update(events).set({ logo, updatedAt: new Date() }).where(eq(events.id, row.id))
    }
  }
  console.log(`Eventos revisados: ${rows.length}`)
}

async function main() {
  console.log('Migrando imágenes de productos...')
  await migrateProducts()
  console.log('Migrando imágenes/PDFs de blog...')
  await migrateBlog()
  console.log('Migrando logos de eventos...')
  await migrateEvents()
  console.log(`\nListo. ${uploadedCount} archivos únicos subidos a S3. ${skippedMissing} rutas no se encontraron en disco (se dejaron sin cambios).`)
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
