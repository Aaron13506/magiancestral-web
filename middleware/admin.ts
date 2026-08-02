export default defineNuxtRouteMiddleware(async (to) => {
  // `$fetch` a secas no reenvía la cookie `admin_session` cuando esto corre en
  // el servidor: cualquier recarga de /admin/* respondía 401 y devolvía al
  // login aunque la sesión fuera válida. `useRequestFetch()` sí propaga las
  // cabeceras de la petición entrante.
  const request = useRequestFetch()

  try {
    await request('/api/admin/auth/me')
  } catch {
    return navigateTo({
      path: '/admin/login',
      // Al volver a entrar, el login devuelve a donde se quería ir.
      query: to.fullPath === '/admin' ? undefined : { redirect: to.fullPath }
    })
  }
})
