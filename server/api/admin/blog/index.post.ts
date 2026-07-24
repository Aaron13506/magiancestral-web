import { useDb } from '../../../db/client'
import { blogArticles } from '../../../db/schema'
import { createArticleSchema } from '../../../utils/validation/blog'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = createArticleSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.issues[0]?.message || 'Datos inválidos' })
  }

  const db = useDb()
  const [created] = await db.insert(blogArticles).values(parsed.data).returning()
  return created
})
