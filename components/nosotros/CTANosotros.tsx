// IMPERIUM IURIS — T05 CTA Nosotros
// Módulo: M1 — Sitio Web Público
// RF: RF-43, RF-44, RF-45
// Desarrollado: 2026-05-19
import Button from '@/components/ui/Button'

export default function CTANosotros() {
  return (
    <section className="bg-black px-4 py-24 text-center sm:px-6 lg:px-8">
      <h2 className="mx-auto max-w-4xl font-trajan text-3xl font-bold uppercase tracking-[0.1em] text-white md:text-5xl">Cuando el riesgo aumenta, la improvisacion desaparece</h2>
      <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-8 text-text-muted">Converse con nuestro equipo y reciba una evaluacion juridica estrategica y confidencial.</p>
      <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
        <Button href="/contacto">Solicitar consulta confidencial</Button>
        <Button href="/contacto?tipo=urgencia" variant="secondary">Hablar con un especialista ahora</Button>
      </div>
    </section>
  )
}
