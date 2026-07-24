import { desc } from 'drizzle-orm'
import { useDb } from '../../db/client'
import { blogArticles } from '../../db/schema'

export default defineEventHandler(async () => {
  const db = useDb()
  return db
    .select({
      slug: blogArticles.slug,
      title: blogArticles.title,
      description: blogArticles.description,
      date: blogArticles.date,
      image: blogArticles.image,
      author: blogArticles.author,
      category: blogArticles.category,
      pdfUrl: blogArticles.pdfUrl
    })
    .from(blogArticles)
    .orderBy(desc(blogArticles.date))
})
