'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { MessageCircle } from 'lucide-react'

export default function ChatInviteBanner() {
  const supabase = createSupabaseBrowserClient()
  // null = cargando | false = no logueado | true = logueado
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setLoggedIn(!!user))
  }, [supabase])

  if (loggedIn === null) return null

  return (
    <div className="mt-4 border border-gold/30 bg-gold/5 p-4">
      <div className="flex items-start gap-3">
        <MessageCircle size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          {loggedIn ? (
            <>
              <p className="font-montserrat text-sm font-medium text-primary">
                Continúe en contacto con su abogado
              </p>
              <Link
                href="/chat"
                className="mt-3 inline-block border border-gold bg-gold px-4 py-2 font-montserrat text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-gold/90"
              >
                Ir al chat →
              </Link>
            </>
          ) : (
            <>
              <p className="font-montserrat text-sm font-medium text-primary">
                ¿Quiere dar seguimiento a su consulta?
              </p>
              <p className="mt-1 font-montserrat text-xs font-light leading-relaxed text-primary/70">
                Inicie sesión con Google para chatear directamente con su abogado.
              </p>
              <Link
                href="/login"
                className="mt-3 inline-block border border-gold/50 bg-white px-4 py-2 font-montserrat text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-gold/5"
              >
                Iniciar sesión con Google →
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
