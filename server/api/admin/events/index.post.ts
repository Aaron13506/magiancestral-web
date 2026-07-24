import { useDb } from '../../../db/client'
import { events } from '../../../db/schema'
import { createEventSchema } from '../../../utils/validation/events'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = createEventSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.issues[0]?.message || 'Datos inválidos' })
  }

  const db = useDb()
  const [created] = await db.insert(events).values(parsed.data).returning()
  return created
})
