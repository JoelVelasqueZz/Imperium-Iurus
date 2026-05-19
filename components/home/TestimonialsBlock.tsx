// IMPERIUM IURIS — T04 Testimonios
// Módulo: M1 — Sitio Web Público
// RF: RF-18, RF-19, RF-20
// Desarrollado: 2026-05-19
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { testimonials } from '@/lib/constants'

export default function TestimonialsBlock() {
  return (
    <section className="bg-secondary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Prueba social" title="Reserva absoluta en cada caso" subtitle="Testimonios anonimos de clientes que confiaron asuntos sensibles a la firma." />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((quote, index) => (
            <Reveal key={quote} delay={index * 0.08}>
              <blockquote className="h-full border border-border bg-card-bg p-8">
                <p className="font-montserrat text-lg font-light italic leading-8 text-text-light">“{quote}”</p>
                <footer className="mt-6 font-cinzel text-xs font-semibold uppercase tracking-[0.25em] text-gold">Cliente confidencial</footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
