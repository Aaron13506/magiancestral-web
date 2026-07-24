import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: 'Datos inválidos' })
  }

  const config = useRuntimeConfig()
  const { username, password } = parsed.data

  const validUsername = username === config.adminUsername
  const validPassword = config.adminPasswordHash
    ? await verifyPassword(password, config.adminPasswordHash)
    : false

  if (!validUsername || !validPassword) {
    throw createError({ statusCode: 401, message: 'Credenciales inválidas' })
  }

  const token = await signAdminSession()

  setCookie(event, ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS
  })

  return { ok: true }
})
