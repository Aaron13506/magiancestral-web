import type { H3Event } from 'h3'

/**
 * Fuerza a Vercel a regenerar ya mismo una ruta con `isr` en vez de esperar a
 * que pase un visitante después de los 5 minutos de caché. Sin esto, en un
 * sitio con poco tráfico una edición del panel puede tardar mucho más de 5
 * minutos en verse: ISR solo revalida cuando llega una petición después de
 * vencido el plazo, y esa misma petición todavía recibe la versión vieja.
 *
 * Es "mejor esfuerzo": si falla (falta el token, no hay red, Vercel tarda) no
 * debe tumbar el guardado, que para entonces ya se escribió en la base de
 * datos. Sin `VERCEL_ISR_BYPASS_TOKEN` configurado (p. ej. en local) no hace
 * nada.
 */
export async function revalidatePath(event: H3Event, path: string) {
  const token = useRuntimeConfig().vercelIsrBypassToken
  if (!token) return

  const host = getRequestHeader(event, 'x-forwarded-host') || getRequestHeader(event, 'host')
  if (!host) return

  const protocol = getRequestHeader(event, 'x-forwarded-proto') || 'https'
  const url = `${protocol}://${host}${path}`

  try {
    await $fetch.raw(url, {
      headers: { 'x-prerender-revalidate': token },
      timeout: 8000
    })
  } catch (err) {
    console.error(`[revalidate] No se pudo refrescar ${path}:`, err)
  }
}
