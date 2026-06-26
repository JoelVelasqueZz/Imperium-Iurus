import { supabase } from '@/lib/supabase'
import ArticulosAdmin, { type Articulo } from './ArticulosAdmin'

export const dynamic = 'force-dynamic'

async function getArticulos(): Promise<Articulo[]> {
  const { data, error } = await supabase
    .from('articulos')
    .select('id, titulo, slug, categoria, resumen, tiempo_lectura, publicado, created_at')
    .order('created_at', { ascending: false })
  if (error) { console.error('[admin/blog]', error); return [] }
  return (data ?? []) as Articulo[]
}

export default async function AdminBlogPage() {
  const articulos   = await getArticulos()
  const publicados  = articulos.filter((a) => a.publicado).length
  const borradores  = articulos.filter((a) => !a.publicado).length

  return (
    <div className="px-6 pb-16 pt-8">
      <div className="mb-8 border-b border-border pb-6">
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-gold/50">Panel de administración</p>
        <h1 className="mt-1 font-cinzel text-3xl font-bold uppercase tracking-wider text-gold">Blog / CMS</h1>
        <div className="mt-5 flex flex-wrap gap-4">
          {([['Publicados', publicados, 'text-emerald-400'], ['Borradores', borradores, 'text-yellow-400'], ['Total', articulos.length, 'text-gold']] as const).map(([label, value, color]) => (
            <div key={label} className="border border-border bg-card-bg px-5 py-3 text-center">
              <p className={`font-cinzel text-2xl font-bold ${color}`}>{value}</p>
              <p className="mt-0.5 font-montserrat text-[10px] uppercase tracking-widest text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <ArticulosAdmin articulos={articulos} />
    </div>
  )
}
