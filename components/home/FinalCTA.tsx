// IMPERIUM IURIS — T03 CTA final
// Módulo: M1 — Sitio Web Público
// RF: RF-01, RF-03, RF-04
import Button from '@/components/ui/Button'
import { HOME } from '@/lib/constants'

export default function FinalCTA() {
  return (
    <section className="bg-black px-4 py-28 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-trajan text-4xl font-bold uppercase tracking-[0.1em] text-white md:text-6xl">
          {HOME.finalCta.title}
        </h2>
        <div className="mx-auto mt-6 h-px w-24 origin-center animate-[fadeInUp_1.2s_ease-out_forwards] bg-gold" />
        <p className="mx-auto mt-7 max-w-2xl text-lg font-light leading-8 text-text-muted">
          {HOME.finalCta.subtitle}
        </p>
        <Button href="/contacto" className="mt-9 px-12 py-5 text-sm">
          {HOME.finalCta.cta}
        </Button>
      </div>
    </section>
  )
}
