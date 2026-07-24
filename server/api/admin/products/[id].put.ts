import { eq } from 'drizzle-orm'
import { useDb } from '../../../db/client'
import { products } from '../../../db/schema'
import { updateProductSchema } from '../../../utils/validation/products'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'Id inválido' })
  }

  const body = await readBody(event)
  const parsed = updateProductSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.issues[0]?.message || 'Datos inválidos' })
  }

  const db = useDb()
  const [updated] = await db
    .update(products)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning()

  if (!updated) {
    throw createError({ statusCode: 404, message: 'Producto no encontrado' })
  }
  return updated
})
