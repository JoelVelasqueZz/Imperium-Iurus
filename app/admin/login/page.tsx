'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { Lock } from 'lucide-react'

function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirect     = searchParams.get('redirect') ?? '/admin/agenda'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState<string | null>(null)
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createSupabaseBrowserClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Credenciales incorrectas. Verifique su correo y contraseña.')
      setLoading(false)
      return
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="admin-login-email" className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">
          Correo electrónico
        </label>
        <input
          id="admin-login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full border border-border bg-card-bg px-4 py-3 font-montserrat text-sm text-text-light placeholder-text-muted/50 outline-none focus:border-gold"
          placeholder="admin@imperiumiuris.ec"
        />
      </div>
      <div>
        <label htmlFor="admin-login-password" className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">
          Contraseña
        </label>
        <input
          id="admin-login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full border border-border bg-card-bg px-4 py-3 font-montserrat text-sm text-text-light placeholder-text-muted/50 outline-none focus:border-gold"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full border border-gold bg-gold py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-gold/90 disabled:opacity-60"
      >
        {loading ? 'Verificando...' : 'Ingresar al panel'}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-gold/40 bg-gold/10">
            <Lock size={20} className="text-gold" />
          </div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-gold/50">
            Panel de administración
          </p>
          <h1 className="mt-1 font-cinzel text-2xl font-bold uppercase tracking-widest text-gold">
            Imperium Iuris
          </h1>
        </div>
        <div className="border border-border bg-card-bg p-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
