import { z } from 'zod'

const bodySchema = z.object({
  keys: z.array(z.string().min(1)).min(1, 'Selecciona al menos un archivo')
})

export default defineEventHandler(async (event) => {
  const parsed = bodySchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.issues[0]?.message || 'Datos inválidos' })
  }

  const results = await Promise.allSettled(parsed.data.keys.map(key => deleteMedia(key)))
  const failed = results.filter(r => r.status === 'rejected').length

  if (failed === results.length) {
    throw createError({ statusCode: 502, message: 'No se pudo borrar ningún archivo del almacenamiento' })
  }

  return { ok: true, deleted: results.length - failed, failed }
})
