'use client'

// IMPERIUM IURIS — T10 Botón flotante de urgencia 24/7
// Módulo: M1 — Sitio Web Público
// RF: RF-03, RF-04
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Phone, Siren, X } from 'lucide-react'
import { CONTACT, getWhatsAppUrl } from '@/lib/constants'

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

const itemClass =
  'focus-gold flex items-center gap-3 whitespace-nowrap rounded-full border border-gold-bright bg-card-bg px-4 py-3 pr-5 font-montserrat text-xs font-bold uppercase tracking-widest text-text-light shadow-xl shadow-black/40 transition-colors hover:bg-gold hover:text-primary'

export default function UrgencyFloatingButton() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const close = () => setOpen(false)

  const options = [
    {
      label: 'WhatsApp',
      icon: () => <Siren size={18} aria-hidden="true" />,
      href: getWhatsAppUrl(),
      type: 'external' as const,
    },
    {
      label: 'Llamada directa',
      icon: () => <Phone size={18} aria-hidden="true" />,
      href: `tel:${CONTACT.phone.replace(/\s/g, '')}`,
      type: 'tel' as const,
    },
    {
      label: 'Formulario rápido',
      icon: () => <FileText size={18} aria-hidden="true" />,
      href: '/contacto?tipo=urgencia',
      type: 'internal' as const,
    },
  ]

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            className="flex flex-col items-end gap-3"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {options.map((opt, i) => {
              const Icon = opt.icon
              const transition = { duration: 0.22, delay: i * 0.05, ease: 'easeOut' as const }

              return (
                <motion.div key={opt.label} variants={itemVariants} transition={transition} role="none">
                  {opt.type === 'internal' ? (
                    <Link href={opt.href} className={itemClass} role="menuitem" onClick={close}>
                      <Icon />
                      {opt.label}
                    </Link>
                  ) : (
                    <a
                      href={opt.href}
                      target={opt.type === 'external' ? '_blank' : undefined}
                      rel={opt.type === 'external' ? 'noopener noreferrer' : undefined}
                      className={itemClass}
                      role="menuitem"
                      onClick={close}
                    >
                      <Icon />
                      {opt.label}
                    </a>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Abrir opciones de contacto urgente 24/7"
        className="focus-gold relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold-bright bg-gold text-primary shadow-2xl shadow-black/50 transition-all hover:bg-gold-bright md:h-16 md:w-16"
      >
        {!open && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gold-bright"
            animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <motion.span
          key={open ? 'close' : 'open'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="relative flex"
        >
          {open ? <X size={26} aria-hidden="true" /> : <Siren size={28} aria-hidden="true" />}
        </motion.span>
      </button>
    </div>
  )
}
