import { eq } from 'drizzle-orm'
import { useDb } from '../../../db/client'
import { events } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'Id inválido' })
  }

  const db = useDb()
  const [item] = await db.select().from(events).where(eq(events.id, id))
  if (!item) {
    throw createError({ statusCode: 404, message: 'Evento no encontrado' })
  }
  return item
})
