import { useDb } from '../../../db/client'
import { blogArticles, events, products } from '../../../db/schema'
import { listMedia } from '../../../utils/s3'

/**
 * Biblioteca de medios: todo lo subido al bucket, marcando qué archivos están
 * referenciados por algún producto, artículo o evento para poder borrar los
 * huérfanos sin romper el sitio.
 */
export default defineEventHandler(async () => {
  const [media, usage] = await Promise.all([
    listMedia(),
    collectUsage()
  ])

  return media.map(item => ({
    ...item,
    usedBy: usage.get(item.url) || []
  }))
})

interface UsageRef {
  type: 'product' | 'blog' | 'event'
  id: number
  label: string
}

async function collectUsage() {
  const db = useDb()
  const map = new Map<string, UsageRef[]>()

  const add = (url: unknown, ref: UsageRef) => {
    if (typeof url !== 'string' || !url) return
    const list = map.get(url)
    if (list) {
      if (!list.some(r => r.type === ref.type && r.id === ref.id)) list.push(ref)
    } else {
      map.set(url, [ref])
    }
  }

  const [productRows, blogRows, eventRows] = await Promise.all([
    db.select({ id: products.id, name: products.name, image: products.image, gallery: products.gallery }).from(products),
    db.select({ id: blogArticles.id, title: blogArticles.title, image: blogArticles.image, pdfUrl: blogArticles.pdfUrl, content: blogArticles.content }).from(blogArticles),
    db.select({ id: events.id, title: events.title, logo: events.logo }).from(events)
  ])

  for (const row of productRows) {
    const ref: UsageRef = { type: 'product', id: row.id, label: row.name }
    add(row.image, ref)
    for (const url of (Array.isArray(row.gallery) ? row.gallery : [])) add(url, ref)
  }

  for (const row of blogRows) {
    const ref: UsageRef = { type: 'blog', id: row.id, label: row.title }
    add(row.image, ref)
    add(row.pdfUrl, ref)
    // El contenido es HTML: puede incorporar imágenes o enlaces al bucket.
    for (const url of extractUrls(row.content)) add(url, ref)
  }

  for (const row of eventRows) {
    add(row.logo, { type: 'event', id: row.id, label: row.title })
  }

  return map
}

function extractUrls(html: string | null): string[] {
  if (!html) return []
  return Array.from(html.matchAll(/(?:src|href)="([^"]+)"/g), m => m[1])
}
