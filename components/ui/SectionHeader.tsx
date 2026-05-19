// IMPERIUM IURIS — T01 Encabezado de sección
// Módulo: M1 — Sitio Web Público
// RF: RF-01
// Desarrollado: 2026-05-19
import GoldDivider from './GoldDivider'

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow ? <p className="mb-3 font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold-light">{eyebrow}</p> : null}
      <h2 className="font-cinzel text-3xl font-bold tracking-wider text-gold md:text-4xl">{title}</h2>
      <GoldDivider />
      {subtitle ? <p className="font-montserrat text-base font-light leading-relaxed text-text-muted md:text-lg">{subtitle}</p> : null}
    </div>
  )
}
