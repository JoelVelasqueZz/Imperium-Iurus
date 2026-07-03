const STORAGE_KEY = 'ii_trusted_device'

// La firma del token vive en el servidor (lib/trusted-device-server.ts) —
// el cliente solo guarda el token opaco y pide al servidor que lo emita/valide.

export async function saveTrustedDevice(): Promise<void> {
  if (typeof window === 'undefined') return

  try {
    const res = await fetch('/api/auth/trusted-device', { method: 'POST' })
    if (!res.ok) return
    const { token } = await res.json()
    if (typeof token === 'string') localStorage.setItem(STORAGE_KEY, token)
  } catch {
    // Si falla, simplemente no se recuerda el dispositivo — no es crítico.
  }
}

export async function isTrustedDevice(): Promise<boolean> {
  if (typeof window === 'undefined') return false

  const token = localStorage.getItem(STORAGE_KEY)
  if (!token) return false

  try {
    const res = await fetch('/api/auth/trusted-device/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    if (!res.ok) return false

    const { trusted } = await res.json()
    if (!trusted) localStorage.removeItem(STORAGE_KEY)
    return Boolean(trusted)
  } catch {
    return false
  }
}

export function clearTrustedDevice(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
