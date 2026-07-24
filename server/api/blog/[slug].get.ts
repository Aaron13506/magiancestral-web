import { eq } from 'drizzle-orm'
import { useDb } from '../../db/client'
import { blogArticles } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const db = useDb()
  const [article] = await db.select().from(blogArticles).where(eq(blogArticles.slug, slug!))

  if (!article) {
    throw createError({ statusCode: 404, message: 'Article not found' })
  }

  return article
})
