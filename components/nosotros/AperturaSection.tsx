// IMPERIUM IURIS — T05 Apertura Nosotros
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
import { NOSOTROS } from '@/lib/constants'

export default function AperturaSection() {
  return (
    <section className="premium-surface px-4 pb-20 pt-36 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <p className="font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">
          {NOSOTROS.apertura.eyebrow}
        </p>
        <h1 className="mt-6 font-trajan text-4xl font-bold uppercase tracking-[0.08em] text-white md:text-6xl">
          {NOSOTROS.apertura.title}
        </h1>
        <p className="mx-auto mt-7 max-w-3xl text-lg font-light leading-8 text-text-muted">
          {NOSOTROS.apertura.intro}
        </p>
        <p className="mx-auto mt-8 max-w-4xl text-base font-light leading-8 text-text-light">
          {NOSOTROS.apertura.description}
        </p>
        <p className="mx-auto mt-4 max-w-4xl text-base font-light leading-8 text-text-muted">
          {NOSOTROS.apertura.tagline}
        </p>
      </div>
    </section>
  )
}
