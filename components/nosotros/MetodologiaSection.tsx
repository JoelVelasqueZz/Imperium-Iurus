// IMPERIUM IURIS — T05 Metodología de trabajo
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
// Desarrollado: 2026-05-19
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { methodologySteps } from '@/lib/constants'

export default function MetodologiaSection() {
  return (
    <section className="bg-secondary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title="Metodologia de Trabajo" subtitle="Cada etapa reduce incertidumbre y aumenta control." />
        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gold/45 md:left-1/2" />
          <div className="space-y-8">
            {methodologySteps.map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className={`relative grid gap-4 md:grid-cols-2 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                  <div className={`${index % 2 === 0 ? 'md:col-start-2' : ''} ml-14 border border-border bg-card-bg p-6 md:ml-0`}>
                    <span className="absolute left-3 top-6 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-primary md:left-1/2 md:-ml-2.5" />
                    <p className="font-cinzel text-xs font-semibold uppercase tracking-[0.25em] text-gold">Paso {index + 1}</p>
                    <h3 className="mt-3 font-cinzel text-xl font-semibold text-text-light">{title}</h3>
                    <p className="mt-3 text-sm font-light text-text-muted">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
