// IMPERIUM IURIS — T03 Desarrollo bloque urgencia
// Módulo: M1 — Sitio Web Público
// RF: RF-01, RF-03, RF-04
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { HOME, urgencyCases } from '@/lib/constants'

export default function UrgencyBlock() {
  return (
    <section className="border-y border-gold/50 bg-card-bg px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={HOME.urgency.eyebrow}
          title={HOME.urgency.title}
          subtitle={HOME.urgency.subtitle}
        />
        <p className="mb-12 text-center font-cinzel text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {HOME.urgency.badge}
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          {urgencyCases.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="h-full border border-border bg-primary/70 p-7">
                <h3 className="font-cinzel text-xl font-semibold tracking-wide text-text-light">{item.title}</h3>
                <p className="mt-3 font-cinzel text-sm font-semibold tracking-wide text-gold-light">{item.headline}</p>
                <p className="mt-4 text-sm font-light leading-7 text-text-muted">{item.text}</p>
                <ul className="mt-6 space-y-2 text-sm font-light text-text-muted">
                  {item.items.map((listItem) => (
                    <li key={listItem} className="border-l border-gold/40 pl-3">{listItem}</li>
                  ))}
                </ul>
                <Button href="/contacto?tipo=urgencia" variant="secondary" className="mt-7 w-full px-4">
                  {item.button}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/contacto?tipo=urgencia" className="animate-pulse-gold bg-gold-bright px-10 py-5 text-base">
            {HOME.urgency.cta} <ArrowRight size={18} />
          </Button>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.24em] text-text-muted">
            {HOME.urgency.footer}
          </p>
        </div>
      </div>
    </section>
  )
}
