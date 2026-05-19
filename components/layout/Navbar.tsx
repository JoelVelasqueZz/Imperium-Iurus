'use client'

// IMPERIUM IURIS — T02 Navbar principal
// Módulo: M1 — Sitio Web Público
// RF: RF-01, RF-05
// Desarrollado: 2026-05-19
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BRAND, CONTACT, NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-gold/50 bg-primary/85 shadow-lg shadow-black/30 backdrop-blur-xl' : 'border-transparent bg-primary/30 backdrop-blur-sm'}`}>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-gold flex min-w-0 items-center gap-3" aria-label="Inicio Imperium Iuris">
          <Image src="/logo-imperium.png" alt="Logo dorado de Imperium Iuris" width={54} height={49} className="h-12 w-auto object-contain" priority />
          <span className="hidden font-trajan text-lg font-bold uppercase tracking-[0.15em] text-gold sm:block">{BRAND.name}</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="focus-gold font-cinzel text-xs font-medium uppercase tracking-widest text-text-light transition-colors hover:text-gold">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button href={`tel:${CONTACT.phone}`} variant="danger" className="px-4 py-3">
            <Phone size={16} /> Urgencia 24/7
          </Button>
        </div>

        <button className="focus-gold inline-flex h-11 w-11 items-center justify-center border border-gold/50 text-gold md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Cerrar menu' : 'Abrir menu'} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-primary/95 px-4 pb-6 pt-2 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="focus-gold border-b border-border py-4 font-cinzel text-sm font-medium uppercase tracking-widest text-text-light" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Button href={`tel:${CONTACT.phone}`} variant="danger" className="mt-4 w-full">
              <Phone size={16} /> Urgencia 24/7
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
