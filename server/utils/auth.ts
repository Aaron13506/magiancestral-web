import { SignJWT, jwtVerify } from 'jose'

export const ADMIN_SESSION_COOKIE = 'admin_session'
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 2 // 2h

function getSecretKey() {
  const config = useRuntimeConfig()
  return new TextEncoder().encode(config.jwtSecret)
}

export async function signAdminSession() {
  return new SignJWT({ sub: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey())
}

export async function verifyAdminSession(token: string) {
  const { payload } = await jwtVerify(token, getSecretKey())
  return payload
}
