const ALLOWED_TYPES = new Set(['application/pdf'])
const MAX_SIZE_BYTES = 20 * 1024 * 1024 // 20MB

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const file = parts?.find(p => p.name === 'file' && p.filename)

  if (!file || !file.data) {
    throw createError({ statusCode: 400, message: 'No se recibió ningún archivo' })
  }

  const contentType = file.type || 'application/octet-stream'
  if (!ALLOWED_TYPES.has(contentType)) {
    throw createError({ statusCode: 400, message: 'Solo se permiten archivos PDF' })
  }

  if (file.data.length > MAX_SIZE_BYTES) {
    throw createError({ statusCode: 400, message: 'El archivo supera el tamaño máximo permitido (20MB)' })
  }

  const url = await uploadImage(file.data, contentType, file.filename || 'document.pdf', 'documents')
  return { url }
})
