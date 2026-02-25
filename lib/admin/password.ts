import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'

const SCRYPT_KEY_LENGTH = 64

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString('hex')
  return `${salt}:${derivedKey}`
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(':')
  if (!salt || !key) {
    return false
  }

  const derivedKey = scryptSync(password, salt, SCRYPT_KEY_LENGTH)
  const storedKey = Buffer.from(key, 'hex')

  if (derivedKey.length !== storedKey.length) {
    return false
  }

  return timingSafeEqual(derivedKey, storedKey)
}
