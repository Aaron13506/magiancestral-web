import { randomUUID } from 'node:crypto'

/**
 * Registro de errores y peticiones para los logs de Vercel.
 *
 * Vercel oculta el detalle de los 500 al cliente (`{"message":"Server Error"}`),
 * así que sin esto no hay forma de saber qué falló en producción. El plugin
 * cubre los dos modos de fallo:
 *
 * - **Error lanzado**: el hook `error` vuelca mensaje, stack y los campos
 *   propios del driver (Postgres, AWS SDK), recorriendo la cadena de `cause`.
 * - **Cuelgue**: si una petición agota el tiempo de la función, esta muere y
 *   nunca llega a lanzar nada. Por eso se registra también el INICIO de cada
 *   petición: una línea `-->` sin su `<--` identifica exactamente qué se quedó
 *   colgado y dónde.
 *
 * Cada petición lleva un id corto que viaja al navegador en la cabecera
 * `x-request-id`, para poder casar un error visto en pantalla con su línea de
 * log. Para silenciar el registro de peticiones: `LOG_REQUESTS=false`.
 */

const LOG_REQUESTS = process.env.LOG_REQUESTS !== 'false'
const SLOW_REQUEST_MS = 1_000

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    const requestId = randomUUID().slice(0, 8)
    event.context.requestId = requestId
    event.context.startedAt = Date.now()

    // Se envía siempre: permite localizar la línea de log correspondiente
    // desde las DevTools del navegador.
    setResponseHeader(event, 'x-request-id', requestId)

    if (LOG_REQUESTS && isTracked(event.path)) {
      console.log(`--> [${requestId}] ${event.method} ${event.path}`)
    }
  })

  nitroApp.hooks.hook('afterResponse', (event) => {
    if (!LOG_REQUESTS || !isTracked(event.path)) return

    const ms = Date.now() - (event.context.startedAt || Date.now())
    const status = getResponseStatus(event)
    const slow = ms >= SLOW_REQUEST_MS ? '  ⚠ LENTA' : ''
    console.log(`<-- [${event.context.requestId}] ${event.method} ${event.path} ${status} ${ms}ms${slow}`)
  })

  nitroApp.hooks.hook('error', (error: any, { event }) => {
    const status = error?.statusCode || 500
    const requestId = event?.context?.requestId || '--------'
    const where = event ? `${event.method} ${event.path}` : 'sin petición'

    // 401/403/404 son ruido esperable (sesión caducada, rutas inexistentes):
    // una línea basta, sin stack.
    if (status < 500) {
      console.warn(`[${requestId}] ${status} ${where} — ${error?.statusMessage || error?.message || 'sin mensaje'}`)
      return
    }

    console.error(
      `\n=== ERROR ${status} [${requestId}] ${where} ===\n` +
      describe(error).join('\n') +
      '\n=== fin del error ===\n'
    )
  })
})

/** Solo interesan las rutas de API; los assets estáticos serían puro ruido. */
function isTracked(path = '') {
  return path.startsWith('/api/')
}

/**
 * Aplana un error y su cadena de `cause` en líneas legibles, incluyendo los
 * campos específicos de cada driver, que suelen ser los que dicen la verdad.
 */
function describe(error: any, depth = 0): string[] {
  if (!error || depth > 4) return []

  const pad = '  '.repeat(depth)
  const lines: string[] = []

  lines.push(`${pad}${error.name || 'Error'}: ${error.message || String(error)}`)

  // Postgres (postgres.js): el `code` y el `detail` identifican el fallo real.
  for (const key of ['code', 'severity', 'detail', 'hint', 'position', 'table', 'column', 'constraint_name', 'routine'] as const) {
    if (error[key] != null) lines.push(`${pad}  ${key}: ${error[key]}`)
  }

  // AWS SDK v3 (Supabase Storage habla S3): estado HTTP e intentos de reintento.
  if (error.$metadata) {
    const meta = error.$metadata
    lines.push(`${pad}  s3: httpStatus=${meta.httpStatusCode} intentos=${meta.attempts} reintentoTotal=${meta.totalRetryDelay}ms requestId=${meta.requestId || '-'}`)
  }

  // `data` es donde H3 guarda el cuerpo de un createError().
  if (error.data) lines.push(`${pad}  data: ${safeJson(error.data)}`)

  if (error.stack) {
    const frames = String(error.stack).split('\n').slice(1, 9)
    lines.push(...frames.map(frame => `${pad}  ${frame.trim()}`))
  }

  if (error.cause) {
    lines.push(`${pad}  causado por:`)
    lines.push(...describe(error.cause, depth + 1))
  }

  return lines
}

function safeJson(value: unknown) {
  try {
    return JSON.stringify(value)?.slice(0, 500)
  } catch {
    return String(value)
  }
}
