// IMPERIUM IURIS — T05 Filosofía
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { NOSOTROS, philosophyPillars } from '@/lib/constants'

export default function FilosofiaSection() {
  return (
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={NOSOTROS.filosofia.title}
          subtitle={NOSOTROS.filosofia.subtitle}
        />
        <div className="grid gap-6 md:grid-cols-4">
          {philosophyPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.08}>
              <article className="h-full border border-border bg-card-bg p-7">
                <p className="font-trajan text-4xl font-bold text-gold">{pillar.roman}</p>
                <h3 className="mt-5 font-cinzel text-xl font-semibold text-text-light">{pillar.title}</h3>
                <p className="mt-4 text-sm font-light leading-7 text-text-muted">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-center font-cinzel text-xl font-semibold tracking-wide text-gold-light">
          {NOSOTROS.filosofia.closing}
        </p>
      </div>
    </section>
  )
}
