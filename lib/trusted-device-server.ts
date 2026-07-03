import { createHmac, timingSafeEqual } from 'crypto'

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

function sign(userId: string, expiresAt: number): string {
  const secret = process.env.TRUSTED_DEVICE_SECRET
  if (!secret) throw new Error('TRUSTED_DEVICE_SECRET no está configurado')
  return createHmac('sha256', secret).update(`${userId}:${expiresAt}`).digest('hex')
}

export function issueTrustedDeviceToken(userId: string): string {
  const expiresAt = Date.now() + THIRTY_DAYS_MS
  const signature = sign(userId, expiresAt)
  return `${userId}.${expiresAt}.${signature}`
}

export function verifyTrustedDeviceToken(token: string, userId: string): boolean {
  const parts = token.split('.')
  if (parts.length !== 3) return false

  const [tokenUserId, expiresAtRaw, signature] = parts
  if (tokenUserId !== userId) return false

  const expiresAt = Number(expiresAtRaw)
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false

  let expectedBuf: Buffer
  let receivedBuf: Buffer
  try {
    expectedBuf = Buffer.from(sign(userId, expiresAt), 'hex')
    receivedBuf = Buffer.from(signature, 'hex')
  } catch {
    return false
  }
  if (expectedBuf.length !== receivedBuf.length) return false

  return timingSafeEqual(expectedBuf, receivedBuf)
}
