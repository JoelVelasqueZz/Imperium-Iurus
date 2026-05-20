// IMPERIUM IURIS — T04 Diferencial IMPERIUM IURIS
// Módulo: M1 — Sitio Web Público
// RF: RF-18, RF-19, RF-20
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import SectionHeader from '@/components/ui/SectionHeader'
import { differentialItems, HOME } from '@/lib/constants'

export default function DifferentialBlock() {
  return (
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={HOME.differential.eyebrow}
          title={HOME.differential.title}
          subtitle={HOME.differential.subtitle}
        />
        <div className="relative grid gap-6 lg:grid-cols-6">
          <div className="absolute left-0 right-0 top-14 hidden h-px bg-gold/40 lg:block" />
          {differentialItems.map(({ icon: Icon, title, text, impact }, index) => (
            <Reveal key={title} delay={index * 0.06}>
              <article className="relative h-full border border-border bg-card-bg p-5 transition-colors hover:border-gold">
                <div className="mb-5 flex h-14 w-14 items-center justify-center border border-gold bg-primary text-gold">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="font-cinzel text-sm font-semibold uppercase tracking-wider text-text-light">{title}</h3>
                <p className="mt-4 text-sm font-light leading-7 text-text-muted">{text}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-gold-light">{impact}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="mb-5 font-cinzel text-lg font-semibold tracking-wide text-text-light">
            {HOME.differential.closing}
          </p>
          <Button href="/contacto">{HOME.differential.cta}</Button>
        </div>
      </div>
    </section>
  )
}
