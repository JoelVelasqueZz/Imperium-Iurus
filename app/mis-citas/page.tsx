import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import { getUser } from '@/lib/supabase-server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

type CitaEstado = 'pendiente' | 'confirmada' | 'cancelada'

const ESTADO_CONFIG: Record<CitaEstado, { label: string; className: string }> = {
  pendiente:  { label: 'Pendiente',  className: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400' },
  confirmada: { label: 'Confirmada', className: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' },
  cancelada:  { label: 'Cancelada',  className: 'border-red-500/50 bg-red-500/10 text-red-400' },
}

const TIPO_LABEL: Record<string, string> = {
  personal:    'Consulta Personal',
  empresarial: 'Consulta Empresarial',
  urgencia:    'Urgencia Penal',
}

export default async function MisCitasPage() {
  const user = await getUser()
  if (!user) redirect('/login')

  const { data: citas } = await supabase
    .from('citas')
    .select('id, tipo_consulta, fecha, hora, estado')
    .eq('cliente_id', user.id)
    .order('fecha', { ascending: false })

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? ''
  const firstName = fullName.split(' ')[0] || user.email?.split('@')[0] || 'Cliente'

  return (
    <div className="flex min-h-screen flex-col bg-primary">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-[#060b12] px-5 py-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/50">Portal privado</p>
          <p className="font-cinzel text-sm font-bold uppercase tracking-widest text-gold">Imperium Iuris</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-montserrat text-xs text-text-muted sm:block">{firstName}</span>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 font-montserrat text-[10px] uppercase tracking-widest text-text-muted transition-colors hover:border-gold/40 hover:text-gold"
          >
            <ArrowLeft size={12} />
            <span className="hidden sm:inline">Inicio</span>
          </Link>
        </div>
      </header>

      {/* Cuerpo */}
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <CalendarDays size={22} className="text-gold" />
            <h1 className="font-cinzel text-2xl font-bold uppercase tracking-widest text-gold">Mis citas</h1>
          </div>
          <p className="mt-1 font-montserrat text-sm text-text-muted">
            Historial de sus consultas agendadas en Imperium Iuris.
          </p>

          {!citas || citas.length === 0 ? (
            <div className="mt-12 border border-border bg-card-bg p-10 text-center">
              <CalendarDays size={38} className="mx-auto mb-4 text-text-muted/25" />
              <p className="font-cinzel text-base text-text-muted">No tiene citas agendadas</p>
              <p className="mt-2 font-montserrat text-sm text-text-muted/50">
                Agende su primera consulta confidencial con nuestro equipo.
              </p>
              <Link
                href="/agenda"
                className="mt-6 inline-block border border-gold px-6 py-2.5 font-montserrat text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:bg-gold/10"
              >
                Agendar cita
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-3">
              {citas.map((cita) => {
                const estado = (cita.estado ?? 'pendiente') as CitaEstado
                const cfg    = ESTADO_CONFIG[estado] ?? ESTADO_CONFIG.pendiente
                const [y, mo, d] = (cita.fecha as string).split('-')
                return (
                  <div key={cita.id} className="border border-border bg-card-bg p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-cinzel text-sm font-semibold uppercase tracking-wide text-text-light">
                          {TIPO_LABEL[cita.tipo_consulta as string] ?? cita.tipo_consulta}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
                          <span className="flex items-center gap-1.5 font-montserrat text-xs text-text-muted">
                            <CalendarDays size={11} />
                            {`${d}/${mo}/${y}`}
                          </span>
                          <span className="flex items-center gap-1.5 font-montserrat text-xs text-text-muted">
                            <Clock size={11} />
                            {(cita.hora as string).slice(0, 5)}
                          </span>
                        </div>
                      </div>
                      <span className={`shrink-0 border px-2.5 py-1 font-montserrat text-[10px] font-bold uppercase tracking-widest ${cfg.className}`}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/agenda"
              className="font-montserrat text-xs uppercase tracking-widest text-gold/50 transition-colors hover:text-gold"
            >
              + Agendar nueva cita
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
