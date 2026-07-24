import 'dotenv/config'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { blogArticles, events, products } from '../server/db/schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set (check your .env file)')
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false })
const db = drizzle(sql)

function readJson(relativePath: string) {
  return JSON.parse(readFileSync(resolve(relativePath), 'utf-8'))
}

async function seedProducts() {
  const data = readJson('public/data/products.json')
  const rows = (data.products || []).map((p: any) => ({
    name: p.name,
    slug: p.slug,
    shortName: p.shortName ?? null,
    price: p.price,
    currency: p.currency || 'USD',
    image: p.image ?? null,
    gallery: p.gallery || [],
    category: p.category ?? null,
    description: p.description ?? null,
    content: p.content ?? null,
    usage: p.usage ?? null,
    ingredients: p.ingredients ?? null,
    precautions: p.precautions ?? null,
    benefits: p.benefits || [],
    inStock: p.inStock ?? true,
    featured: p.featured ?? false,
    topProduct: p.topProduct ?? false,
    artisanal: p.artisanal ?? false
  }))

  if (rows.length === 0) return
  await db.insert(products).values(rows).onConflictDoNothing({ target: products.slug })
  console.log(`Seeded ${rows.length} products (skipping any existing slugs).`)
}

async function seedBlog() {
  const index = readJson('public/data/blog/index.json')
  const rows = index.map((meta: any) => {
    // Articles that link straight to a PDF (pdfUrl) don't have an individual
    // <slug>.json content file — fall back to the index.json metadata for those.
    const articlePath = resolve(`public/data/blog/${meta.slug}.json`)
    const article = existsSync(articlePath) ? readJson(`public/data/blog/${meta.slug}.json`) : meta

    return {
      slug: article.slug,
      title: article.title,
      description: article.description ?? null,
      date: article.date,
      image: article.image ?? null,
      author: article.author ?? null,
      category: article.category,
      pdfUrl: article.pdfUrl ?? null,
      content: article.content ?? null
    }
  })

  if (rows.length === 0) return
  await db.insert(blogArticles).values(rows).onConflictDoNothing({ target: blogArticles.slug })
  console.log(`Seeded ${rows.length} blog articles (skipping any existing slugs).`)
}

async function seedEvents() {
  const rows = readJson('scripts/events-source.json')
  if (rows.length === 0) return
  await db.insert(events).values(rows).onConflictDoNothing({ target: events.slug })
  console.log(`Seeded ${rows.length} events (skipping any existing slugs).`)
}

async function main() {
  await seedProducts()
  await seedBlog()
  await seedEvents()
  await sql.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
