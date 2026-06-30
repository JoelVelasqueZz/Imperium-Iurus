'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { Shield } from 'lucide-react'

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

export default function LoginClientePage() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('error')) {
      setError('Error al iniciar sesión. Intente de nuevo.')
    }
  }, [])

  async function loginConGoogle() {
    setLoading(true)
    setError(null)
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setError('No se pudo conectar con Google. Intente de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4">
      <div className="w-full max-w-sm">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-gold/40 bg-gold/10">
            <Shield size={20} className="text-gold" />
          </div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-gold/50">
            Portal de clientes
          </p>
          <h1 className="mt-1 font-cinzel text-2xl font-bold uppercase tracking-widest text-gold">
            Imperium Iuris
          </h1>
        </div>

        {/* Tarjeta */}
        <div className="border border-border bg-card-bg p-8">
          <p className="mb-6 text-center font-montserrat text-xs leading-relaxed text-text-muted">
            Acceda a su conversación privada con el abogado
          </p>

          {error && (
            <p className="mb-4 border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            onClick={loginConGoogle}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 border border-border bg-white/5 px-4 py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-text-light transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {!loading && <GoogleIcon />}
            {loading ? 'Redirigiendo…' : 'Iniciar sesión con Google'}
          </button>
        </div>

        <p className="mt-6 text-center font-montserrat text-[10px] uppercase tracking-widest text-text-muted/40">
          Acceso exclusivo para clientes registrados
        </p>
      </div>
    </div>
  )
}
