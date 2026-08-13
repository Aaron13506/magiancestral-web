/**
 * Compresión de imágenes en el navegador, antes de subirlas.
 *
 * Vercel bufferiza el cuerpo de la petición en su infraestructura y corta a
 * ~4,5 MB ANTES de invocar la función, devolviendo un 413 que no pasa por
 * Nitro: ni se ejecutan las validaciones de `uploads/image.post.ts` ni queda
 * rastro en los logs. Por eso una foto de móvil fallaba con un error opaco.
 *
 * Recomprimir aquí resuelve eso y, de paso, evita servir originales de cámara
 * de varios megas como imágenes de producto.
 */

/** Lado mayor de la imagen resultante. Suficiente para la ficha de producto. */
const MAX_DIMENSION = 1600

const QUALITY = 0.85

/** Por debajo de este tamaño ya es una imagen ligera; recomprimir no compensa. */
const SKIP_BELOW_BYTES = 512 * 1024

/**
 * SVG es vectorial y un GIF puede estar animado: pasarlos por un canvas los
 * destruiría (el SVG se rasteriza, el GIF pierde la animación). Se suben tal
 * cual.
 */
const COMPRESSIBLE = new Set(['image/jpeg', 'image/png', 'image/webp'])

/** Tope real de la plataforma para el cuerpo de una petición. */
export const VERCEL_BODY_LIMIT_BYTES = 4.5 * 1024 * 1024

/**
 * Devuelve una versión reducida de la imagen, o el archivo original si no se
 * puede o no merece la pena comprimirlo. Nunca lanza: ante cualquier fallo de
 * decodificación se devuelve el original y que decida el servidor.
 */
export async function compressImage(file: File): Promise<File> {
  if (!COMPRESSIBLE.has(file.type) || typeof createImageBitmap !== 'function') return file

  let bitmap: ImageBitmap
  try {
    // `imageOrientation` aplica la orientación EXIF: sin esto, las fotos
    // verticales de móvil se subirían giradas.
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    return file
  }

  try {
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))

    // Ya es pequeña en píxeles y en bytes: dejarla como está.
    if (scale === 1 && file.size <= SKIP_BELOW_BYTES) return file

    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)

    const context = canvas.getContext('2d')
    if (!context) return file
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

    // WebP conserva la transparencia, así que los PNG con alfa siguen bien.
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/webp', QUALITY))

    // Si la recompresión no gana nada (imagen ya optimizada), se queda el original.
    if (!blob || blob.size >= file.size) return file

    return new File([blob], withWebpExtension(file.name), {
      type: 'image/webp',
      lastModified: Date.now()
    })
  } catch {
    return file
  } finally {
    bitmap.close()
  }
}

function withWebpExtension(name: string): string {
  const base = name.replace(/\.[^./\\]+$/, '') || 'imagen'
  return `${base}.webp`
}
