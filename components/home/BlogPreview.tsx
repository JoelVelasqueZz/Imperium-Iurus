import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { supabase } from '@/lib/supabase'

type ArticuloPreview = {
  slug: string
  titulo: string
  categoria: string
  resumen: string
  tiempo_lectura: string
}

async function getArticulos(): Promise<ArticuloPreview[]> {
  const { data } = await supabase
    .from('articulos')
    .select('slug, titulo, categoria, resumen, tiempo_lectura')
    .eq('publicado', true)
    .order('created_at', { ascending: false })
    .limit(3)
  return (data ?? []) as ArticuloPreview[]
}

export default async function BlogPreview() {
  const articulos = await getArticulos()

  if (articulos.length === 0) return null

  return (
    <section className="bg-text-light px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Contenido de autoridad"
          title="Blog jurídico premium"
          subtitle="Criterios prácticos para actuar a tiempo frente a riesgos penales."
          invert
        />
        <div className="grid gap-6 md:grid-cols-3">
          {articulos.map((art, index) => (
            <Reveal key={art.slug} delay={index * 0.08}>
              <article className="h-full border border-primary/15 bg-white p-7 transition-colors hover:border-gold">
                <p className="font-inter text-xs font-medium uppercase tracking-[0.25em] text-gold">
                  {art.categoria} · {art.tiempo_lectura}
                </p>
                <h3 className="mt-5 font-cinzel text-xl font-semibold tracking-wide text-primary">{art.titulo}</h3>
                <p className="mt-4 font-inter text-sm font-light leading-7 text-primary/65">{art.resumen}</p>
                <Link
                  href={`/blog/${art.slug}`}
                  className="focus-gold mt-6 inline-flex items-center gap-2 font-inter text-xs font-bold uppercase tracking-widest text-gold hover:text-gold-bright"
                >
                  Leer artículo <ArrowRight size={16} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
