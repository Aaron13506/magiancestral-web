import { eq } from 'drizzle-orm'
import { useDb } from '../../../db/client'
import { products } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'Id inválido' })
  }

  const db = useDb()
  const [deleted] = await db.delete(products).where(eq(products.id, id)).returning({ id: products.id })
  if (!deleted) {
    throw createError({ statusCode: 404, message: 'Producto no encontrado' })
  }
  return { ok: true }
})
