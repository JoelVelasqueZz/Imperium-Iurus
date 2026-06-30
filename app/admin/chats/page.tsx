import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { MessageSquare, User } from 'lucide-react'

export const dynamic = 'force-dynamic'

type Conversacion = {
  clienteId: string
  email: string
  nombre: string | null
  avatar: string | null
  ultimoTexto: string
  ultimaFecha: string
  noLeidos: number
}

async function getConversaciones(): Promise<Conversacion[]> {
  const { data: msgs, error } = await supabase
    .from('mensajes')
    .select('cliente_id, texto, created_at, leido, remitente')
    .order('created_at', { ascending: false })

  if (error || !msgs?.length) return []

  // Agrupar por cliente — primer registro = más reciente
  const map = new Map<string, { ultimoTexto: string; ultimaFecha: string; noLeidos: number }>()
  for (const m of msgs) {
    if (!map.has(m.cliente_id)) {
      map.set(m.cliente_id, { ultimoTexto: m.texto, ultimaFecha: m.created_at, noLeidos: 0 })
    }
    if (m.remitente === 'cliente' && !m.leido) {
      map.get(m.cliente_id)!.noLeidos++
    }
  }

  // Obtener info de usuarios via Auth Admin API
  const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 1000 })
  const userMap = new Map(users.map(u => [u.id, u]))

  return [...map.entries()]
    .map(([clienteId, info]) => {
      const u = userMap.get(clienteId)
      return {
        clienteId,
        email:  u?.email ?? 'Desconocido',
        nombre: (u?.user_metadata?.full_name as string) ?? null,
        avatar: (u?.user_metadata?.avatar_url as string) ?? null,
        ...info,
      }
    })
    .sort((a, b) => new Date(b.ultimaFecha).getTime() - new Date(a.ultimaFecha).getTime())
}

function formatFecha(iso: string) {
  const d    = new Date(iso)
  const diff = Date.now() - d.getTime()
  const min  = Math.floor(diff / 60_000)
  if (min < 1)    return 'ahora'
  if (min < 60)   return `${min}m`
  if (diff < 86_400_000)
    return d.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Guayaquil' })
  return d.toLocaleDateString('es-EC', { day: '2-digit', month: 'short', timeZone: 'America/Guayaquil' })
}

export default async function AdminChatsPage() {
  const conversaciones = await getConversaciones()
  const totalNoLeidos  = conversaciones.reduce((s, c) => s + c.noLeidos, 0)

  return (
    <main className="min-h-screen bg-primary px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 border-b border-border pb-6">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold/60">
            Panel de administración
          </p>
          <h1 className="mt-2 font-cinzel text-3xl font-bold uppercase tracking-wider text-gold">
            Chats con Clientes
          </h1>

          <div className="mt-5 flex flex-wrap gap-4">
            <div className="border border-border bg-card-bg px-5 py-3 text-center">
              <p className="font-cinzel text-2xl font-bold text-gold">{conversaciones.length}</p>
              <p className="mt-0.5 font-montserrat text-[10px] uppercase tracking-widest text-text-muted">
                Conversaciones
              </p>
            </div>
            {totalNoLeidos > 0 && (
              <div className="border border-yellow-500/30 bg-card-bg px-5 py-3 text-center">
                <p className="font-cinzel text-2xl font-bold text-yellow-400">{totalNoLeidos}</p>
                <p className="mt-0.5 font-montserrat text-[10px] uppercase tracking-widest text-text-muted">
                  Sin leer
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Lista */}
        {conversaciones.length === 0 ? (
          <div className="py-20 text-center">
            <MessageSquare size={32} className="mx-auto mb-3 text-text-muted/20" />
            <p className="font-montserrat text-sm text-text-muted">
              No hay conversaciones aún.
            </p>
            <p className="mt-1 font-montserrat text-xs text-text-muted/50">
              Los clientes que inicien sesión y escriban aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversaciones.map((c) => (
              <Link
                key={c.clienteId}
                href={`/admin/chats/${c.clienteId}`}
                className="flex items-center gap-4 border border-border bg-card-bg px-5 py-4 transition-colors hover:border-gold/40 hover:bg-gold/5"
              >
                {/* Avatar */}
                {c.avatar ? (
                  <Image
                    src={c.avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white/5">
                    <User size={16} className="text-text-muted" />
                  </div>
                )}

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate font-montserrat text-sm font-semibold text-text-light">
                      {c.nombre ?? c.email}
                    </p>
                    <span className="shrink-0 font-montserrat text-[10px] text-text-muted/60">
                      {formatFecha(c.ultimaFecha)}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p className="truncate font-montserrat text-xs text-text-muted">
                      {c.ultimoTexto}
                    </p>
                    {c.noLeidos > 0 && (
                      <span className="ml-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold font-montserrat text-[10px] font-bold text-primary">
                        {c.noLeidos > 9 ? '9+' : c.noLeidos}
                      </span>
                    )}
                  </div>
                  {c.nombre && (
                    <p className="mt-0.5 font-montserrat text-[10px] text-text-muted/50">
                      {c.email}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
