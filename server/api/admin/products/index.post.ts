import { useDb } from '../../../db/client'
import { products } from '../../../db/schema'
import { createProductSchema } from '../../../utils/validation/products'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = createProductSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.issues[0]?.message || 'Datos inválidos' })
  }

  const db = useDb()
  const [created] = await db.insert(products).values(parsed.data).returning()
  return created
})
