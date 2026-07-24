import { eq } from 'drizzle-orm'
import { useDb } from '../../db/client'
import { products } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const db = useDb()
  const [product] = await db.select().from(products).where(eq(products.slug, slug!))
  if (!product) {
    throw createError({ statusCode: 404, message: 'Producto no encontrado' })
  }
  return product
})
