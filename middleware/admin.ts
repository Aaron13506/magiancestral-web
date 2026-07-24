export default defineNuxtRouteMiddleware(async () => {
  try {
    await $fetch('/api/admin/auth/me')
  } catch {
    return navigateTo('/admin/login')
  }
})
