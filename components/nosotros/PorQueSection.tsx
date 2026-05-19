// IMPERIUM IURIS — T05 Por qué existimos
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
// Desarrollado: 2026-05-19
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { riskList } from '@/lib/constants'

export default function PorQueSection() {
  return (
    <section className="bg-secondary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Defendemos lo que una investigacion puede poner en riesgo" subtitle="Un proceso penal no solo compromete la libertad. Puede afectar toda una vida institucional, familiar y patrimonial." />
        <div className="grid gap-4 md:grid-cols-5">
          {riskList.map((risk, index) => (
            <Reveal key={risk} delay={index * 0.06}>
              <div className="border border-border bg-card-bg p-5 text-center font-cinzel text-sm font-semibold uppercase tracking-wider text-gold-light">{risk}</div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center text-base font-light leading-8 text-text-muted">
          IMPERIUM IURIS nace para intervenir con precision tecnica antes de que una crisis juridica genere daños irreversibles.
        </p>
        <p className="mt-6 text-center font-trajan text-2xl font-bold uppercase tracking-[0.12em] text-white">Defendemos personas, empresas y futuros.</p>
      </div>
    </section>
  )
}
