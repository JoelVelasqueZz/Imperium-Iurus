// IMPERIUM IURIS — T03 Botón flotante WhatsApp 24/7
// Módulo: M1 — Sitio Web Público
// RF: RF-03, RF-04
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl } from '@/lib/constants'

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-gold fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold-bright bg-gold text-primary shadow-2xl shadow-black/50 transition-all hover:bg-gold-bright md:h-16 md:w-16"
      aria-label="Contactar por WhatsApp urgencia 24/7"
    >
      <MessageCircle size={28} aria-hidden="true" />
    </a>
  )
}
