const STORAGE_KEY = 'ii_trusted_device'
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

interface TrustedDeviceData {
  userId: string
  expiresAt: number
  signature: string
}

function generateSignature(userId: string, expiresAt: number): string {
  const data = `${userId}:${expiresAt}:imperium-iuris-2fa`
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

export function saveTrustedDevice(userId: string): void {
  if (typeof window === 'undefined') return

  const expiresAt = Date.now() + THIRTY_DAYS_MS
  const signature = generateSignature(userId, expiresAt)

  const data: TrustedDeviceData = { userId, expiresAt, signature }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function isTrustedDevice(userId: string | undefined): boolean {
  if (typeof window === 'undefined' || !userId) return false

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return false

    const data: TrustedDeviceData = JSON.parse(stored)

    if (data.userId !== userId) return false
    if (Date.now() > data.expiresAt) {
      localStorage.removeItem(STORAGE_KEY)
      return false
    }

    const expectedSignature = generateSignature(data.userId, data.expiresAt)
    if (data.signature !== expectedSignature) {
      localStorage.removeItem(STORAGE_KEY)
      return false
    }

    return true
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return false
  }
}

export function clearTrustedDevice(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
