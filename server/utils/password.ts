import bcrypt from 'bcryptjs'

export function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash)
}

export function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10)
}
