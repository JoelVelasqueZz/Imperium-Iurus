// IMPERIUM IURIS — T05 Equipo multidisciplinario
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
import { UserRound } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { NOSOTROS, specialists } from '@/lib/constants'

export default function EquipoSection() {
  return (
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title={NOSOTROS.equipo.title}
          subtitle={NOSOTROS.equipo.subtitle}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specialists.map((name, index) => (
            <Reveal key={name} delay={index * 0.04}>
              <article className="border border-border bg-card-bg p-6 text-center transition-colors hover:border-gold">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-primary text-gold">
                  <UserRound size={28} aria-hidden="true" />
                </div>
                <h3 className="font-cinzel text-sm font-semibold uppercase tracking-wider text-text-light">{name}</h3>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-center font-cinzel text-xl font-semibold tracking-wide text-gold-light">
          {NOSOTROS.equipo.closing}
        </p>
      </div>
    </section>
  )
}
