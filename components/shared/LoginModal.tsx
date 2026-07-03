'use client'

import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { X } from 'lucide-react'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

type Props = {
  open: boolean
  /** Clave de sessionStorage donde se guarda el formulario antes del redirect OAuth */
  storageKey: string
  /** Datos del formulario a persistir */
  formData: unknown
  /** Ruta a la que vuelve el usuario después de hacer login (ej. '/agenda') */
  returnPath: string
  onClose: () => void
  /** El usuario eligió continuar sin cuenta — el padre procesa el envío normalmente */
  onContinue: () => void
}

export default function LoginModal({
  open, storageKey, formData, returnPath, onClose, onContinue,
}: Props) {
  if (!open) return null

  async function loginConGoogle() {
    sessionStorage.setItem(storageKey, JSON.stringify(formData))
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${returnPath}`,
      },
    })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative w-full max-w-md border border-border bg-[#0D1624] p-8 shadow-2xl shadow-black/60">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 text-text-muted transition-colors hover:text-text-light"
        >
          <X size={18} />
        </button>

        <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/50">
          Portal de clientes
        </p>
        <h2
          id="login-modal-title"
          className="mt-1 font-cinzel text-xl font-bold uppercase tracking-widest text-gold"
        >
          Vincule su solicitud
        </h2>
        <p className="mt-3 font-montserrat text-sm leading-relaxed text-text-muted">
          Inicie sesión con Google para confirmar su solicitud y acceder al seguimiento
          desde su portal privado — incluyendo chat directo con su abogado y
          historial de citas.
        </p>

        <button
          type="button"
          onClick={loginConGoogle}
          className="mt-6 flex w-full items-center justify-center gap-3 border border-border bg-white/5 px-4 py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-text-light transition-colors hover:bg-white/10"
        >
          <GoogleIcon />
          Iniciar sesión con Google
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="mt-4 w-full font-montserrat text-xs text-text-muted/50 transition-colors hover:text-text-muted"
        >
          Continuar sin cuenta →
        </button>
      </div>
    </div>
  )
}
