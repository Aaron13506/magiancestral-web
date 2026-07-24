import { eq } from 'drizzle-orm'
import { useDb } from '../../../db/client'
import { events } from '../../../db/schema'
import { updateEventSchema } from '../../../utils/validation/events'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'Id inválido' })
  }

  const body = await readBody(event)
  const parsed = updateEventSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.issues[0]?.message || 'Datos inválidos' })
  }

  const db = useDb()
  const [updated] = await db
    .update(events)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(events.id, id))
    .returning()

  if (!updated) {
    throw createError({ statusCode: 404, message: 'Evento no encontrado' })
  }
  return updated
})
