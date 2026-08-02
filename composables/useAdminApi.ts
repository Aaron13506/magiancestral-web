/**
 * Cliente HTTP del panel administrativo.
 *
 * Resuelve dos problemas que tenía el panel anterior:
 *
 * 1. `$fetch` en SSR no reenvía la cookie `admin_session` del navegador, así
 *    que cualquier recarga de `/admin/*` respondía 401 y expulsaba al login.
 *    `useRequestFetch()` sí propaga las cabeceras de la petición entrante.
 * 2. Un 401 (sesión de 2 h expirada) reventaba en pantalla como un error
 *    crudo. Ahora avisa y devuelve al login conservando el destino.
 */
export function useAdminApi() {
  const request = useRequestFetch()
  const toast = useAdminToast()
  const route = useRoute()

  async function call<T = unknown>(url: string, options: Record<string, any> = {}): Promise<T> {
    try {
      return await request<T>(url, options as any)
    } catch (err: any) {
      const status = err?.statusCode ?? err?.response?.status
      if (status === 401 && !url.includes('/auth/')) {
        toast.warn('Tu sesión expiró. Vuelve a iniciar sesión.')
        await navigateTo(`/admin/login?redirect=${encodeURIComponent(route.fullPath)}`)
      }
      throw err
    }
  }

  return {
    raw: request,
    get: <T = unknown>(url: string, options: Record<string, any> = {}) =>
      call<T>(url, { ...options, method: 'GET' }),
    post: <T = unknown>(url: string, body?: any, options: Record<string, any> = {}) =>
      call<T>(url, { ...options, method: 'POST', body }),
    put: <T = unknown>(url: string, body?: any, options: Record<string, any> = {}) =>
      call<T>(url, { ...options, method: 'PUT', body }),
    del: <T = unknown>(url: string, options: Record<string, any> = {}) =>
      call<T>(url, { ...options, method: 'DELETE' })
  }
}

/** Extrae el mensaje legible de un error de `$fetch`/H3. */
export function adminErrorMessage(err: any, fallback = 'Ocurrió un error inesperado'): string {
  return (
    err?.data?.message ||
    err?.data?.statusMessage ||
    err?.statusMessage ||
    (typeof err?.message === 'string' && !err.message.startsWith('[') ? err.message : '') ||
    fallback
  )
}
