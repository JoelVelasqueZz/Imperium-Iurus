import { NextResponse } from 'next/server'
import { getUser } from '@/lib/supabase-server'
import { issueTrustedDeviceToken } from '@/lib/trusted-device-server'

// Emite un token firmado (HMAC) para "recordar este dispositivo" — solo se
// llama tras completar el challenge de 2FA, con la sesión ya autenticada.
export async function POST() {
  const user = await getUser()
  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const token = issueTrustedDeviceToken(user.id)
    return NextResponse.json({ token })
  } catch {
    return NextResponse.json({ error: 'No se pudo emitir el token' }, { status: 500 })
  }
}
