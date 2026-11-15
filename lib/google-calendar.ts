// Conexión con Google Calendar usando OAuth (T08).
// Las claves salen de .env.local; nunca se escriben en el código.

let tokenGuardado: { valor: string; venceEn: number } | null = null

/** Devuelve un access token válido (dura 1 hora). Lo usan la T09 y la T10. */
export async function obtenerTokenGoogle(): Promise<string> {
  // Si ya tenemos uno y le queda más de 1 minuto, se reutiliza
  if (tokenGuardado && Date.now() < tokenGuardado.venceEn - 60_000) {
    return tokenGuardado.valor
  }

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN ?? '',
      grant_type: 'refresh_token',
    }),
  })

  if (!res.ok) {
    console.error('[google-calendar] No se pudo obtener el token:', await res.text())
    throw new Error('No se pudo conectar con Google Calendar')
  }

  const data = (await res.json()) as { access_token: string; expires_in: number }
  tokenGuardado = { valor: data.access_token, venceEn: Date.now() + data.expires_in * 1000 }
  return data.access_token
}

type EventoGoogle = { id: string; summary?: string; start: { dateTime?: string; date?: string } }

/** Lista los próximos eventos del calendario de pruebas (criterio de la T08). */
export async function listarProximosEventos(cantidad = 5) {
  const token = await obtenerTokenGoogle()
  const calendarId = encodeURIComponent(process.env.GOOGLE_CALENDAR_ID ?? 'primary')
  const params = new URLSearchParams({
    maxResults: String(cantidad),
    singleEvents: 'true',
    orderBy: 'startTime',
    timeMin: new Date().toISOString(),
  })

  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    console.error('[google-calendar] Error al listar eventos:', await res.text())
    throw new Error('No se pudieron leer los eventos del calendario')
  }

  const data = (await res.json()) as { items?: EventoGoogle[] }
  return (data.items ?? []).map((e) => ({
    id: e.id,
    titulo: e.summary ?? '(sin título)',
    inicio: e.start.dateTime ?? e.start.date,
  }))
}