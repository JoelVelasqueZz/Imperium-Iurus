'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { Eye, EyeOff, Check, X } from 'lucide-react'

type PasswordStrength = 'débil' | 'media' | 'fuerte'

function getPasswordStrength(password: string): { strength: PasswordStrength; score: number } {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { strength: 'débil', score }
  if (score <= 3) return { strength: 'media', score }
  return { strength: 'fuerte', score }
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-green-400' : 'text-text-muted/60'}`}>
      {met ? <Check size={12} /> : <X size={12} />}
      <span>{text}</span>
    </div>
  )
}

function StrengthBar({ score }: { score: number }) {
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500']
  const labels: Record<number, { text: string; color: string }> = {
    0: { text: '', color: '' },
    1: { text: 'Débil', color: 'text-red-400' },
    2: { text: 'Regular', color: 'text-orange-400' },
    3: { text: 'Media', color: 'text-yellow-400' },
    4: { text: 'Fuerte', color: 'text-green-400' },
  }

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= score ? colors[score - 1] : 'bg-border'
            }`}
          />
        ))}
      </div>
      {score > 0 && (
        <p className={`mt-1 text-xs ${labels[score].color}`}>
          {labels[score].text}
        </p>
      )}
    </div>
  )
}

export default function RegistroPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0
  const { score } = getPasswordStrength(password)
  const isValid = hasMinLength && hasUppercase && hasNumber && hasSpecial && passwordsMatch && nombre.trim().length > 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return

    setLoading(true)
    setError(null)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: nombre.trim() },
      },
    })

    if (signUpError) {
      if (signUpError.message.includes('already registered') || signUpError.message.includes('User already registered')) {
        setError('Este correo electrónico ya está registrado. Inicia sesión.')
      } else {
        setError('Error al crear la cuenta. Intente de nuevo.')
      }
      setLoading(false)
      return
    }

    if (data.user?.identities?.length === 0) {
      setError('Este correo ya está asociado a otra cuenta. Prueba iniciar sesión con Google.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary px-4 py-16">
        <div className="w-full max-w-sm text-center">
          <Image
            src="/logo-imperium.png"
            alt="Logo de Imperium Iuris"
            width={80}
            height={72}
            className="mx-auto h-16 w-auto object-contain mix-blend-screen brightness-110"
            priority
          />
          <div className="mt-8 border border-border bg-card-bg p-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-950/30">
              <Check size={32} className="text-green-400" />
            </div>
            <h2 className="font-cinzel text-xl font-bold uppercase tracking-widest text-gold">
              Cuenta creada
            </h2>
            <p className="mt-4 font-montserrat text-sm leading-relaxed text-text-muted">
              Hemos enviado un correo de confirmación a <strong className="text-text-light">{email}</strong>.
              Por favor, verifica tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block w-full border border-gold bg-gold py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-gold/90"
            >
              Ir al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image
            src="/logo-imperium.png"
            alt="Logo de Imperium Iuris"
            width={80}
            height={72}
            className="mx-auto h-16 w-auto object-contain mix-blend-screen brightness-110"
            priority
          />
          <p className="mt-4 font-cinzel text-[10px] uppercase tracking-[0.4em] text-gold/50">
            Crear cuenta
          </p>
          <h1 className="mt-1 font-cinzel text-2xl font-bold uppercase tracking-widest text-gold">
            Imperium Iuris
          </h1>
        </div>

        <div className="border border-border bg-card-bg p-8">
          <p className="mb-6 text-center font-montserrat text-xs leading-relaxed text-text-muted">
            Regístrese para acceder al portal de clientes
          </p>

          {error && (
            <p className="mb-4 border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">
                Nombre completo
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                autoComplete="name"
                className="w-full border border-border bg-card-bg px-4 py-3 font-montserrat text-sm text-text-light placeholder-text-muted/50 outline-none focus:border-gold"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full border border-border bg-card-bg px-4 py-3 font-montserrat text-sm text-text-light placeholder-text-muted/50 outline-none focus:border-gold"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full border border-border bg-card-bg px-4 py-3 pr-12 font-montserrat text-sm text-text-light placeholder-text-muted/50 outline-none focus:border-gold"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/60 hover:text-text-light"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {password.length > 0 && (
                <>
                  <StrengthBar score={score} />
                  <div className="mt-3 space-y-1">
                    <PasswordRequirement met={hasMinLength} text="Mínimo 8 caracteres" />
                    <PasswordRequirement met={hasUppercase} text="Al menos 1 mayúscula" />
                    <PasswordRequirement met={hasNumber} text="Al menos 1 número" />
                    <PasswordRequirement met={hasSpecial} text="Al menos 1 carácter especial" />
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={`w-full border bg-card-bg px-4 py-3 pr-12 font-montserrat text-sm text-text-light placeholder-text-muted/50 outline-none focus:border-gold ${
                    confirmPassword.length > 0
                      ? passwordsMatch
                        ? 'border-green-500/50'
                        : 'border-red-500/50'
                      : 'border-border'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/60 hover:text-text-light"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="mt-1 text-xs text-red-400">Las contraseñas no coinciden</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !isValid}
              className="w-full border border-gold bg-gold py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-montserrat text-xs text-text-muted">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-gold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
