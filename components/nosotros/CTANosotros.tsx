// IMPERIUM IURIS — T05 CTA Nosotros
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
import Button from '@/components/ui/Button'
import { NOSOTROS } from '@/lib/constants'

export default function CTANosotros() {
  return (
    <section className="bg-black px-4 py-24 text-center sm:px-6 lg:px-8">
      <h2 className="mx-auto max-w-4xl font-trajan text-3xl font-bold uppercase tracking-[0.1em] text-white md:text-5xl">
        {NOSOTROS.cta.title}
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-8 text-text-muted">
        {NOSOTROS.cta.subtitle}
      </p>
      <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
        <Button href="/contacto">{NOSOTROS.cta.primary}</Button>
        <Button href="/contacto?tipo=urgencia" variant="secondary">{NOSOTROS.cta.secondary}</Button>
      </div>
    </section>
  )
}
