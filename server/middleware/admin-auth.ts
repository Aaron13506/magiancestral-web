export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/admin/')) return
  if (event.path === '/api/admin/auth/login') return

  const token = getCookie(event, ADMIN_SESSION_COOKIE)
  if (!token) {
    throw createError({ statusCode: 401, message: 'No autenticado' })
  }

  try {
    event.context.admin = await verifyAdminSession(token)
  } catch {
    throw createError({ statusCode: 401, message: 'Sesión inválida o expirada' })
  }
})
