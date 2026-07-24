import { eq } from 'drizzle-orm'
import { useDb } from '../../../db/client'
import { blogArticles } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'Id inválido' })
  }

  const db = useDb()
  const [deleted] = await db.delete(blogArticles).where(eq(blogArticles.id, id)).returning({ id: blogArticles.id })
  if (!deleted) {
    throw createError({ statusCode: 404, message: 'Artículo no encontrado' })
  }
  return { ok: true }
})
