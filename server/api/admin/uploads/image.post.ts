const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
const MAX_SIZE_BYTES = 8 * 1024 * 1024 // 8MB

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const file = parts?.find(p => p.name === 'file' && p.filename)

  if (!file || !file.data) {
    throw createError({ statusCode: 400, message: 'No se recibió ningún archivo' })
  }

  const contentType = file.type || 'application/octet-stream'
  if (!ALLOWED_TYPES.has(contentType)) {
    throw createError({ statusCode: 400, message: 'Tipo de archivo no permitido' })
  }

  if (file.data.length > MAX_SIZE_BYTES) {
    throw createError({ statusCode: 400, message: 'El archivo supera el tamaño máximo permitido (8MB)' })
  }

  const url = await uploadImage(file.data, contentType, file.filename || 'upload')
  return { url }
})
