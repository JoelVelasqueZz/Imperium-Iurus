// IMPERIUM IURIS — T03 Botón flotante WhatsApp placeholder
// Módulo: M1 — Sitio Web Público
// RF: RF-03, RF-04
// Desarrollado: 2026-05-19
import { MessageCircle } from 'lucide-react'
import { CONTACT } from '@/lib/constants'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`}
      className="focus-gold fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold-bright bg-gold text-primary shadow-2xl shadow-black/50 transition-all hover:bg-gold-bright md:h-16 md:w-16"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} aria-hidden="true" />
    </a>
  )
}
