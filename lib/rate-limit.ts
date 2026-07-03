// Rate limit en memoria, por proceso — sin dependencias externas.
// Da protección completa en un servidor de una sola instancia, y protección
// parcial (no perfecta) en despliegues serverless con múltiples instancias,
// ya que la memoria no se comparte entre ellas. Suficiente como primera capa
// contra spam de formularios/bots; para tráfico alto conviene un backend
// compartido (ej. Upstash Redis).

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

const CLEANUP_INTERVAL_MS = 10 * 60 * 1000
let lastCleanup = Date.now()

function cleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

/** true si la solicitud está permitida, false si superó el límite. */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  cleanup(now)

  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (bucket.count >= limit) return false

  bucket.count++
  return true
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}
