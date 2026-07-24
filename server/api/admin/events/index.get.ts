import { asc } from 'drizzle-orm'
import { useDb } from '../../../db/client'
import { events } from '../../../db/schema'

export default defineEventHandler(async () => {
  const db = useDb()
  return db.select().from(events).orderBy(asc(events.eventDate))
})
