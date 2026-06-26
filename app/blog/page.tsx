import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Blog Jurídico',
  description: 'Artículos de derecho penal ecuatoriano — guías prácticas para actuar ante una detención, investigación fiscal o riesgo empresarial.',
  alternates: { canonical: 'https://imperiumiuris.ec/blog' },
  openGraph: {
    title: 'Blog Jurídico | Imperium Iuris',
    description: 'Contenido jurídico de autoridad para decisiones urgentes en Ecuador.',
    url: 'https://imperiumiuris.ec/blog',
  },
}

export const dynamic = 'force-dynamic'

type Articulo = {
  id: string
  titulo: string
  slug: string
  categoria: string
  resumen: string
  tiempo_lectura: string
  created_at: string
}

async function getArticulos(categoria?: string): Promise<{ articulos: Articulo[]; categorias: string[] }> {
  const { data } = await supabase
    .from('articulos')
    .select('id, titulo, slug, categoria, resumen, tiempo_lectura, created_at')
    .eq('publicado', true)
    .order('created_at', { ascending: false })

  const articulos = (data ?? []) as Articulo[]
  const categorias = ['Todos', ...Array.from(new Set(articulos.map((a) => a.categoria))).sort()]
  const filtered = !categoria || categoria === 'Todos' ? articulos : articulos.filter((a) => a.categoria === categoria)
  return { articulos: filtered, categorias }
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { timeZone: 'America/Guayaquil', year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const query    = await searchParams
  const selected = query.categoria ?? 'Todos'
  const { articulos, categorias } = await getArticulos(selected)

  return (
    <main className="bg-primary px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Blog" title="Contenido juridico de autoridad" subtitle="Guias practicas para decisiones urgentes, empresariales y reputacionales." />
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categorias.map((categoria) => (
            <Link key={categoria} href={categoria === 'Todos' ? '/blog' : `/blog?categoria=${encodeURIComponent(categoria)}`}
              className={`focus-gold border px-4 py-2 font-cinzel text-xs uppercase tracking-widest ${selected === categoria ? 'border-gold bg-gold text-primary' : 'border-border text-text-muted hover:border-gold hover:text-gold'}`}>
              {categoria}
            </Link>
          ))}
        </div>
        {articulos.length === 0 ? (
          <p className="py-20 text-center text-text-muted">No hay artículos publicados{selected !== 'Todos' ? ` en "${selected}"` : ''} aún.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {articulos.map((art) => (
              <article key={art.slug} className="border border-border bg-card-bg p-7 transition-colors hover:border-gold">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-light">{art.categoria} · {fmtDate(art.created_at)} · {art.tiempo_lectura}</p>
                <h2 className="mt-5 font-cinzel text-xl font-semibold tracking-wide text-text-light">{art.titulo}</h2>
                <p className="mt-4 text-sm font-light leading-7 text-text-muted">{art.resumen}</p>
                <Link href={`/blog/${art.slug}`} className="focus-gold mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
                  Leer articulo <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
