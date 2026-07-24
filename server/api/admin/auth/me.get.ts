export default defineEventHandler(() => {
  // Reaching this handler means server/middleware/admin-auth.ts already
  // verified the session cookie for any /api/admin/** request.
  return { authenticated: true }
})
