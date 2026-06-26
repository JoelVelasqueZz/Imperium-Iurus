import { supabase } from '@/lib/supabase'
import ConsultasAdmin, { type Consulta } from './ConsultasAdmin'

export const dynamic = 'force-dynamic'

async function getConsultas(): Promise<Consulta[]> {
  const { data, error } = await supabase
    .from('consultas')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.error('[admin/contacto]', error); return [] }
  return (data ?? []) as Consulta[]
}

export default async function AdminContactoPage() {
  const consultas   = await getConsultas()
  const counts      = { nuevo: 0, leido: 0, respondido: 0, archivado: 0 }
  consultas.forEach((c) => { if (c.estado in counts) counts[c.estado as keyof typeof counts]++ })

  return (
    <div className="px-6 pb-16 pt-8">
      <div className="mb-8 border-b border-border pb-6">
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold/50">Panel de administración</p>
        <h1 className="mt-1 font-cinzel text-3xl font-bold uppercase tracking-wider text-gold">Consultas Recibidas</h1>
        <div className="mt-5 flex flex-wrap gap-4">
          {([['Nuevas', counts.nuevo, 'text-sky-400'], ['Leídas', counts.leido, 'text-yellow-400'], ['Respondidas', counts.respondido, 'text-emerald-400'], ['Total', consultas.length, 'text-gold']] as const).map(([label, value, color]) => (
            <div key={label} className="border border-border bg-card-bg px-5 py-3 text-center">
              <p className={`font-cinzel text-2xl font-bold ${color}`}>{value}</p>
              <p className="mt-0.5 font-montserrat text-[10px] uppercase tracking-widest text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <ConsultasAdmin consultas={consultas} />
    </div>
  )
}
