// IMPERIUM IURIS — Panel de administración de citas
// Módulo: M3 — Supabase
// IMPORTANTE: Esta ruta no tiene autenticación todavía. Agregar M5-Auth antes de producción.
import { supabase } from '@/lib/supabase'
import CitasAdmin, { type Cita } from './CitasAdmin'

export const dynamic = 'force-dynamic'

async function getCitas(): Promise<Cita[]> {
  const { data, error } = await supabase
    .from('citas')
    .select('*')
    .order('fecha', { ascending: false })
    .order('hora', { ascending: false })

  if (error) {
    console.error('[admin/agenda] Supabase error:', error)
    return []
  }
  return (data ?? []) as Cita[]
}

export default async function AdminAgendaPage() {
  const citas = await getCitas()

  const pendientes  = citas.filter((c) => c.estado === 'pendiente').length
  const confirmadas = citas.filter((c) => c.estado === 'confirmada').length
  const canceladas  = citas.filter((c) => c.estado === 'cancelada').length

  return (
    <main className="min-h-screen bg-primary px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 border-b border-border pb-6">
          <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold/60">Panel de administración</p>
          <h1 className="mt-2 font-cinzel text-3xl font-bold uppercase tracking-wider text-gold">
            Agenda de Citas
          </h1>

          {/* Resumen */}
          <div className="mt-5 flex flex-wrap gap-4">
            {[
              { label: 'Pendientes',  value: pendientes,  color: 'text-yellow-400' },
              { label: 'Confirmadas', value: confirmadas, color: 'text-emerald-400' },
              { label: 'Canceladas',  value: canceladas,  color: 'text-red-400' },
              { label: 'Total',       value: citas.length, color: 'text-gold' },
            ].map((s) => (
              <div key={s.label} className="border border-border bg-card-bg px-5 py-3 text-center">
                <p className={`font-cinzel text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="mt-0.5 font-montserrat text-[10px] uppercase tracking-widest text-text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <CitasAdmin citas={citas} />
      </div>
    </main>
  )
}
