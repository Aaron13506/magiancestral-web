import { asc, count, desc, gte, sql } from 'drizzle-orm'
import { useDb } from '../../db/client'
import { blogArticles, events, products } from '../../db/schema'
import { listMedia } from '../../utils/s3'

/**
 * Estadísticas del panel. El layout las pide en cada navegación, así que este
 * endpoint tiene dos reglas:
 *
 * 1. Nunca debe devolver 500. Si una parte falla, se degrada a su valor por
 *    defecto y el resto del panel sigue funcionando.
 * 2. Nunca debe bloquearse. Listar el bucket S3 es la operación lenta y con
 *    red de por medio, así que va con timeout y cacheada: si tarda, se
 *    devuelve `null` y la tarjeta de biblioteca lo muestra como no disponible.
 */

const MEDIA_CACHE_MS = 60_000
const MEDIA_TIMEOUT_MS = 2_500

let mediaCache: { at: number; value: MediaStats | null } | null = null

interface MediaStats {
  total: number
  bytes: number
}

const EMPTY_PRODUCTS = { total: 0, outOfStock: 0, featured: 0, noImage: 0 }
const EMPTY_BLOG = { total: 0, studies: 0, reflections: 0 }
const EMPTY_EVENTS = { total: 0, upcoming: 0 }

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
    safe('productTotals', EMPTY_PRODUCTS, async () => {
      const [row] = await db.select({
        total: count(),
        outOfStock: sql<number>`count(*) filter (where ${products.inStock} = false)`.mapWith(Number),
        featured: sql<number>`count(*) filter (where ${products.featured} = true)`.mapWith(Number),
        noImage: sql<number>`count(*) filter (where ${products.image} is null or ${products.image} = '')`.mapWith(Number)
      }).from(products)
      return row ?? EMPTY_PRODUCTS
    }),

    safe('blogTotals', EMPTY_BLOG, async () => {
      const [row] = await db.select({
        total: count(),
        studies: sql<number>`count(*) filter (where ${blogArticles.category} = 'estudios-cientificos')`.mapWith(Number),
        reflections: sql<number>`count(*) filter (where ${blogArticles.category} = 'reflexiones-del-espiritu')`.mapWith(Number)
      }).from(blogArticles)
      return row ?? EMPTY_BLOG
    }),

    safe('eventTotals', EMPTY_EVENTS, async () => {
      const [row] = await db.select({
        total: count(),
        upcoming: sql<number>`count(*) filter (where ${events.eventDate} >= ${today})`.mapWith(Number)
      }).from(events)
      return row ?? EMPTY_EVENTS
    }),

    safe('recentProducts', [], () => db.select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      image: products.image,
      price: products.price,
      currency: products.currency,
      inStock: products.inStock,
      updatedAt: products.updatedAt
    }).from(products).orderBy(desc(products.updatedAt)).limit(5)),

    safe('recentArticles', [], () => db.select({
      id: blogArticles.id,
      title: blogArticles.title,
      slug: blogArticles.slug,
      date: blogArticles.date,
      category: blogArticles.category,
      image: blogArticles.image
    }).from(blogArticles).orderBy(desc(blogArticles.date)).limit(5)),

    safe('upcomingEvents', [], () => db.select({
      id: events.id,
      title: events.title,
      eventDate: events.eventDate,
      location: events.location,
      type: events.type,
      logo: events.logo
    }).from(events).where(gte(events.eventDate, today)).orderBy(asc(events.eventDate)).limit(5)),

    safe('media', null, mediaStats)
  ])

  return {
    username: useRuntimeConfig().adminUsername || 'Admin',
    products: productTotals,
    blog: blogTotals,
    events: eventTotals,
    media,
    recentProducts,
    recentArticles,
    upcomingEvents
  }
})

/**
 * Ejecuta una consulta y, si falla, devuelve el valor por defecto dejando el
 * motivo en los logs del servidor (Vercel oculta el detalle al cliente).
 */
async function safe<T>(label: string, fallback: T, run: () => Promise<T>): Promise<T> {
  try {
    return await run()
  } catch (error) {
    console.error(`[admin/stats] "${label}" falló:`, error)
    return fallback
  }
}

async function mediaStats(): Promise<MediaStats | null> {
  if (mediaCache && Date.now() - mediaCache.at < MEDIA_CACHE_MS) {
    return mediaCache.value
  }

  const config = useRuntimeConfig()
  // Sin bucket configurado no hay nada que listar: evitamos la llamada de red.
  if (!config.s3BucketName || !config.s3EndpointUrl || !config.s3AccessKeyId) {
    mediaCache = { at: Date.now(), value: null }
    return null
  }

  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    const value = await Promise.race([
      listMedia().then(objects => ({
        total: objects.length,
        bytes: objects.reduce((sum, object) => sum + object.size, 0)
      })),
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`listMedia() superó ${MEDIA_TIMEOUT_MS} ms`)),
          MEDIA_TIMEOUT_MS
        )
      })
    ])
    mediaCache = { at: Date.now(), value }
    return value
  } catch (error) {
    console.error('[admin/stats] no se pudo leer la biblioteca:', error)
    // Se cachea el fallo para no reintentar (y volver a esperar) en cada
    // navegación del panel.
    mediaCache = { at: Date.now(), value: null }
    return null
  } finally {
    clearTimeout(timer)
  }
}
