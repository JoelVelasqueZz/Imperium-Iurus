import { supabase } from '@/lib/supabase'
import TestimoniosAdmin, { type Testimonio } from './TestimoniosAdmin'

export const dynamic = 'force-dynamic'

async function getTestimonios(): Promise<Testimonio[]> {
  const { data, error } = await supabase
    .from('testimonios')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.error('[admin/testimonios]', error); return [] }
  return (data ?? []) as Testimonio[]
}

export default async function AdminTestimoniosPage() {
  const testimonios = await getTestimonios()
  const pendientes  = testimonios.filter((t) => t.estado === 'pendiente').length
  const aprobados   = testimonios.filter((t) => t.estado === 'aprobado').length

  return (
    <div className="px-6 pb-16 pt-8">
      <div className="mb-8 border-b border-border pb-6">
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold/50">Panel de administración</p>
        <h1 className="mt-1 font-cinzel text-3xl font-bold uppercase tracking-wider text-gold">Testimonios</h1>
        <div className="mt-5 flex flex-wrap gap-4">
          {([['Pendientes', pendientes, 'text-yellow-400'], ['Aprobados', aprobados, 'text-emerald-400'], ['Total', testimonios.length, 'text-gold']] as const).map(([label, value, color]) => (
            <div key={label} className="border border-border bg-card-bg px-5 py-3 text-center">
              <p className={`font-cinzel text-2xl font-bold ${color}`}>{value}</p>
              <p className="mt-0.5 font-montserrat text-[10px] uppercase tracking-widest text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <TestimoniosAdmin testimonios={testimonios} />
    </div>
  )
}
