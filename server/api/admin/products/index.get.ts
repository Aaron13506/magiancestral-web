import { desc } from 'drizzle-orm'
import { useDb } from '../../../db/client'
import { products } from '../../../db/schema'

export default defineEventHandler(async () => {
  const db = useDb()
  return db.select().from(products).orderBy(desc(products.id))
})
