import { eq } from 'drizzle-orm'
import { useDb } from '../../../db/client'
import { blogArticles } from '../../../db/schema'
import { updateArticleSchema } from '../../../utils/validation/blog'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'Id inválido' })
  }

  const body = await readBody(event)
  const parsed = updateArticleSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.issues[0]?.message || 'Datos inválidos' })
  }

  const db = useDb()
  const [updated] = await db
    .update(blogArticles)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(blogArticles.id, id))
    .returning()

  if (!updated) {
    throw createError({ statusCode: 404, message: 'Artículo no encontrado' })
  }
  return updated
})
