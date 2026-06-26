import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Button from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'
import { sanitizeBlogHtml } from '@/lib/sanitize'

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabase
    .from('articulos')
    .select('titulo, resumen, categoria, slug')
    .eq('slug', slug)
    .eq('publicado', true)
    .single()

  if (!data) return { title: 'Artículo no encontrado' }

  return {
    title: data.titulo,
    description: data.resumen ?? `${data.categoria} — Imperium Iuris`,
    alternates: { canonical: `https://imperiumiuris.ec/blog/${data.slug}` },
    openGraph: {
      title: data.titulo,
      description: data.resumen ?? undefined,
      url: `https://imperiumiuris.ec/blog/${data.slug}`,
      type: 'article',
    },
  }
}

type Articulo = {
  id: string
  titulo: string
  slug: string
  categoria: string
  resumen: string
  contenido: string
  tiempo_lectura: string
  created_at: string
}

async function getArticulo(slug: string): Promise<Articulo | null> {
  const { data } = await supabase
    .from('articulos')
    .select('*')
    .eq('slug', slug)
    .eq('publicado', true)
    .single()
  return data as Articulo | null
}

async function getRelated(slug: string, categoria: string): Promise<Articulo[]> {
  const { data } = await supabase
    .from('articulos')
    .select('id, titulo, slug, categoria')
    .eq('publicado', true)
    .neq('slug', slug)
    .eq('categoria', categoria)
    .limit(2)
  return (data ?? []) as Articulo[]
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { timeZone: 'America/Guayaquil', year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const art = await getArticulo(slug)
  if (!art) notFound()

  const related = await getRelated(slug, art.categoria)

  return (
    <main className="bg-primary px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_340px]">
        <article>
          <nav className="mb-8 text-sm text-text-muted">
            <Link href="/blog" className="focus-gold hover:text-gold">Blog</Link>
            <span className="mx-2">/</span>
            <span>{art.categoria}</span>
          </nav>
          <p className="font-montserrat text-xs font-medium uppercase tracking-[0.25em] text-gold-light">{art.categoria} · {fmtDate(art.created_at)} · {art.tiempo_lectura}</p>
          <h1 className="mt-5 font-cinzel text-4xl font-bold tracking-wide text-text-light md:text-5xl">{art.titulo}</h1>
          <div className="mt-10 max-w-none space-y-6 font-montserrat text-lg font-light leading-9 text-text-muted [&_h2]:font-cinzel [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gold [&_p]:mb-6"
            dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(art.contenido) }} />
          {related.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <h2 className="font-cinzel text-2xl font-semibold text-gold">Articulos relacionados</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {related.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`} className="focus-gold border border-border bg-card-bg p-5 hover:border-gold">
                    <span className="text-xs uppercase tracking-widest text-gold-light">{item.categoria}</span>
                    <span className="mt-2 block font-cinzel text-lg text-text-light">{item.titulo}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
        <aside className="h-fit border border-gold/40 bg-card-bg p-7 lg:sticky lg:top-28">
          <h2 className="font-cinzel text-xl font-semibold tracking-wide text-text-light">¿Tiene una situacion similar?</h2>
          <p className="mt-4 text-sm font-light leading-7 text-text-muted">Converse con un abogado y reciba una evaluacion estrategica y confidencial.</p>
          <Button href="/contacto" className="mt-6 w-full px-4">Consulte con nosotros</Button>
        </aside>
      </div>
    </main>
  )
}
