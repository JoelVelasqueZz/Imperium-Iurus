// IMPERIUM IURIS — T05 Visión
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
// Desarrollado: 2026-05-19
import SectionHeader from '@/components/ui/SectionHeader'

export default function VisionSection() {
  return (
    <section className="bg-secondary px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title="Construimos una nueva generacion de defensa penal en Ecuador" />
        <p className="text-lg font-light leading-8 text-text-muted">
          Aspiramos a convertirnos en la firma penal estrategica mas confiable, sofisticada e innovadora del pais, integrando excelencia juridica, tecnologia y proteccion integral.
        </p>
        <p className="mt-8 font-trajan text-2xl font-bold uppercase tracking-[0.1em] text-white">Defensa penal de nivel internacional adaptada a Ecuador.</p>
      </div>
    </section>
  )
}
