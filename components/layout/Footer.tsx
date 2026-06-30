import Image from 'next/image'
import Link from 'next/link'
import { BRAND, CONTACT, NAV_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-[#0D1624]/20 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Image
              src="/logo-imperium.png"
              alt="Logo Imperium Iuris"
              width={58}
              height={53}
              className="h-12 w-auto object-contain"
            />
            <span className="font-trajan text-lg font-bold uppercase tracking-[0.15em] text-gold">
              {BRAND.name}
            </span>
          </div>
          <p className="max-w-md font-montserrat text-sm font-light leading-7 text-text-muted">
            Defensa penal estrategica para personas, empresas y funcionarios frente a escenarios juridicos complejos.
          </p>
          <p className="mt-5 font-cinzel text-xs uppercase tracking-[0.28em] text-gold-light">
            {BRAND.location}
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-cinzel text-sm font-semibold uppercase tracking-widest text-gold">
            Navegacion
          </h2>
          <div className="grid gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-gold text-sm font-light text-text-muted transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-cinzel text-sm font-semibold uppercase tracking-widest text-gold">
            Contacto
          </h2>
          <div className="space-y-3 text-sm font-light text-text-muted">
            <p>{CONTACT.address}</p>
            <p>{CONTACT.phone}</p>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.hours} | {CONTACT.emergency}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/10 px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span className="text-xs font-light uppercase tracking-[0.2em] text-text-muted">
            © 2026 {BRAND.name}. Todos los derechos reservados.
          </span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            <Link
              href="/legal/terminos"
              className="text-xs font-light text-text-muted transition-colors hover:text-gold focus-gold"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/legal/privacidad"
              className="text-xs font-light text-text-muted transition-colors hover:text-gold focus-gold"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/legal/cookies"
              className="text-xs font-light text-text-muted transition-colors hover:text-gold focus-gold"
            >
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}