import { asc, count, desc, gte, sql } from 'drizzle-orm'
import { useDb } from '../../db/client'
import { blogArticles, events, products } from '../../db/schema'

// La biblioteca vive en S3 y listarla es costoso; el panel pide estas
// estadísticas en cada navegación, así que cacheamos ese dato un minuto.
let mediaCache: { at: number; total: number; bytes: number } | null = null
const MEDIA_CACHE_MS = 60_000

export default defineEventHandler(async () => {
  const db = useDb()
  const today = new Date().toISOString().slice(0, 10)

  const [
    productTotals,
    blogTotals,
    eventTotals,
    recentProducts,
    recentArticles,
    upcomingEvents,
    media
  ] = await Promise.all([
    db.select({
      total: count(),
      outOfStock: sql<number>`count(*) filter (where ${products.inStock} = false)`.mapWith(Number),
      featured: sql<number>`count(*) filter (where ${products.featured} = true)`.mapWith(Number),
      noImage: sql<number>`count(*) filter (where ${products.image} is null or ${products.image} = '')`.mapWith(Number)
    }).from(products),

    db.select({
      total: count(),
      studies: sql<number>`count(*) filter (where ${blogArticles.category} = 'estudios-cientificos')`.mapWith(Number),
      reflections: sql<number>`count(*) filter (where ${blogArticles.category} = 'reflexiones-del-espiritu')`.mapWith(Number)
    }).from(blogArticles),

    db.select({
      total: count(),
      upcoming: sql<number>`count(*) filter (where ${events.eventDate} >= ${today})`.mapWith(Number)
    }).from(events),

    db.select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      image: products.image,
      price: products.price,
      currency: products.currency,
      inStock: products.inStock,
      updatedAt: products.updatedAt
    }).from(products).orderBy(desc(products.updatedAt)).limit(5),

    db.select({
      id: blogArticles.id,
      title: blogArticles.title,
      slug: blogArticles.slug,
      date: blogArticles.date,
      category: blogArticles.category,
      image: blogArticles.image
    }).from(blogArticles).orderBy(desc(blogArticles.date)).limit(5),

    db.select({
      id: events.id,
      title: events.title,
      eventDate: events.eventDate,
      location: events.location,
      type: events.type,
      logo: events.logo
    }).from(events).where(gte(events.eventDate, today)).orderBy(asc(events.eventDate)).limit(5),

    mediaStats()
  ])

  return {
    username: useRuntimeConfig().adminUsername || 'Admin',
    products: productTotals[0] ?? { total: 0, outOfStock: 0, featured: 0, noImage: 0 },
    blog: blogTotals[0] ?? { total: 0, studies: 0, reflections: 0 },
    events: eventTotals[0] ?? { total: 0, upcoming: 0 },
    media,
    recentProducts,
    recentArticles,
    upcomingEvents
  }
})

async function mediaStats() {
  if (mediaCache && Date.now() - mediaCache.at < MEDIA_CACHE_MS) {
    return { total: mediaCache.total, bytes: mediaCache.bytes }
  }

  try {
    const objects = await listMedia()
    mediaCache = {
      at: Date.now(),
      total: objects.length,
      bytes: objects.reduce((sum, o) => sum + o.size, 0)
    }
  } catch {
    // Si el bucket no está configurado, el panel debe seguir funcionando.
    mediaCache = { at: Date.now(), total: 0, bytes: 0 }
  }

  return { total: mediaCache.total, bytes: mediaCache.bytes }
}
