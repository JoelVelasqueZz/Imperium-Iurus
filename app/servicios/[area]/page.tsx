import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import GoldDivider from '@/components/ui/GoldDivider'
import FinalCTA from '@/components/home/FinalCTA'
import { getAreaConServicios } from '@/lib/catalogo'
import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ area: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: slug } = await params
  const area = await getAreaConServicios(slug)

  if (!area) return { title: 'Área no encontrada' }

  return {
    title: area.nombre,
    description: `${area.nombre}. Conozca los servicios que ofrece Imperium Iuris en esta área.`,
    alternates: { canonical: `${SITE_URL}/servicios/${area.slug}` },
    openGraph: {
      title: `${area.nombre} | Imperium Iuris`,
      url: `${SITE_URL}/servicios/${area.slug}`,
    },
  }
}

export default async function AreaPage({ params }: Props) {
  const { area: slug } = await params
  const area = await getAreaConServicios(slug)
  if (!area) notFound()

  return (
    <main className="pt-20">
      <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Ruta de navegación" className="mb-10 font-inter text-sm font-light text-text-muted">
            <Link href="/servicios" className="focus-gold hover:text-gold">Servicios</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span>{area.nombre}</span>
          </nav>

          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold">
              Área {String(area.numero).padStart(2, '0')}
            </p>
            <h1 className="font-cinzel text-3xl font-bold tracking-wider text-gold md:text-4xl">{area.nombre}</h1>
            <GoldDivider />
          </div>

          {area.servicios.length === 0 ? (
            <p className="text-center font-inter text-base font-light text-text-muted">
              Los servicios de esta área estarán disponibles próximamente.
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {area.servicios.map((servicio) => (
                <li
                  key={servicio.slug}
                  className="flex items-start gap-4 border border-border bg-card-bg p-6 transition-colors duration-300 hover:border-gold"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/70 bg-primary font-cinzel text-sm font-semibold text-gold"
                    aria-hidden="true"
                  >
                    {String(servicio.numero).padStart(2, '0')}
                  </span>
                  <h2 className="pt-3 font-cinzel text-lg font-semibold tracking-wide text-text-light">{servicio.nombre}</h2>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/servicios"
              className="focus-gold font-cinzel text-sm font-semibold tracking-wide text-gold transition-colors hover:text-gold-bright"
            >
              ← Todas las áreas
            </Link>
          </div>
        </div>
      </section>
      <FinalCTA />
    </main>
  )
}
