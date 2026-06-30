'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BRAND, CONTACT, NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import NavAuthButton from '@/components/shared/NavAuthButton'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ${
        scrolled
          ? 'border-gold/30 bg-[#0D1624]/97 shadow-xl shadow-black/40'
          : 'border-white/10 bg-[#0D1624]/40'
      }`}
    >
      <nav
        className={`mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 transition-all duration-300 lg:px-12 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="focus-gold flex min-w-0 items-center gap-3" aria-label="Inicio Imperium Iuris">
          <Image
            src="/logo-imperium.png"
            alt="Logo dorado de Imperium Iuris"
            width={72}
            height={65}
            className={`w-auto object-contain mix-blend-screen brightness-110 transition-all duration-300 ${
              scrolled ? 'h-11' : 'h-16'
            }`}
            priority
          />
          <span className="hidden font-trajan text-base font-bold uppercase tracking-[0.18em] text-gold sm:block">
            {BRAND.name}
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-gold relative font-cinzel text-[11px] font-medium uppercase tracking-[0.2em] text-gold/90 transition-colors duration-200 hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth + CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <NavAuthButton />
          <Button href={`tel:${CONTACT.phone}`} variant="danger" className="px-5 py-3 text-xs tracking-widest">
            <Phone size={14} /> Urgencia 24/7
          </Button>
        </div>

        {/* Hamburger */}
        <button
          className="focus-gold inline-flex h-10 w-10 items-center justify-center border border-gold/40 text-gold transition-colors hover:border-gold hover:bg-gold/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {open ? (
        <div className="border-t border-border bg-[#0D1624]/98 px-6 pb-8 pt-3 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-gold border-b border-border/50 py-4 font-cinzel text-sm font-medium uppercase tracking-widest text-gold/90 transition-colors hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <NavAuthButton mobile />
            <Button href={`tel:${CONTACT.phone}`} variant="danger" className="mt-5 w-full">
              <Phone size={16} /> Urgencia 24/7
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}