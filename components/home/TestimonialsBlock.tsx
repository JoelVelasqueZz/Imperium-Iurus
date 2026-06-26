import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { HOME } from '@/lib/constants'
import { supabase } from '@/lib/supabase'

const STATIC_FALLBACK = [
  'Resolvieron un caso extremadamente delicado con absoluta reserva.',
  'Su estrategia evitó consecuencias irreparables para mi familia y mi empresa.',
  'Profesionalismo total. En el momento más crítico, su equipo respondió de inmediato.',
]

type TestimonioRow = { id: string; texto: string }

async function getTestimonios(): Promise<string[]> {
  const { data } = await supabase
    .from('testimonios')
    .select('id, texto')
    .eq('estado', 'aprobado')
    .order('created_at', { ascending: false })
    .limit(3)

  if (!data || data.length === 0) return STATIC_FALLBACK
  return (data as TestimonioRow[]).map((t) => t.texto)
}

export default async function TestimonialsBlock() {
  const quotes = await getTestimonios()

  return (
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow={HOME.testimonials.eyebrow}
          title={HOME.testimonials.title}
          subtitle={HOME.testimonials.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((quote, index) => (
            <Reveal key={quote} delay={index * 0.08}>
              <blockquote className="h-full border border-border bg-card-bg p-8">
                <p className="font-inter text-lg font-light italic leading-8 text-text-light">&ldquo;{quote}&rdquo;</p>
                <footer className="mt-6 font-cinzel text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Cliente confidencial
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
