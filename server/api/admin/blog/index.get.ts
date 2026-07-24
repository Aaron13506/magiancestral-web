import { desc } from 'drizzle-orm'
import { useDb } from '../../../db/client'
import { blogArticles } from '../../../db/schema'

export default defineEventHandler(async () => {
  const db = useDb()
  return db.select().from(blogArticles).orderBy(desc(blogArticles.date))
})
