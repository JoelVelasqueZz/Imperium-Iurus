'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { Shield, ShieldCheck, ArrowLeft, Loader2, Smartphone, Copy, Check } from 'lucide-react'
import type { Factor } from '@supabase/supabase-js'

export default function SeguridadPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [unenrolling, setUnenrolling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [totpFactor, setTotpFactor] = useState<Factor | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [totpUri, setTotpUri] = useState<string | null>(null)
  const [factorId, setFactorId] = useState<string | null>(null)
  const [verifyCode, setVerifyCode] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadFactors()
  }, [])

  async function loadFactors() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const { data: factors } = await supabase.auth.mfa.listFactors()
    const verified = factors?.totp?.find(f => f.status === 'verified')
    setTotpFactor(verified || null)
    setLoading(false)
  }

  async function startEnrollment() {
    setEnrolling(true)
    setError(null)

    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'Authenticator App',
    })

    if (error) {
      setError('Error al iniciar la configuración. Intente de nuevo.')
      setEnrolling(false)
      return
    }

    setQrCode(data.totp.qr_code)
    setSecret(data.totp.secret)
    setTotpUri(data.totp.uri)
    setFactorId(data.id)
  }

  async function verifyEnrollment(e: React.FormEvent) {
    e.preventDefault()
    if (!factorId) return

    setVerifying(true)
    setError(null)

    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId,
    })

    if (challengeError) {
      setError('Error al verificar. Intente de nuevo.')
      setVerifying(false)
      return
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: verifyCode,
    })

    if (verifyError) {
      setError('Código incorrecto. Intente de nuevo.')
      setVerifying(false)
      return
    }

    setSuccess('Autenticación de dos factores activada correctamente.')
    setQrCode(null)
    setSecret(null)
    setTotpUri(null)
    setFactorId(null)
    setVerifyCode('')
    setEnrolling(false)
    setVerifying(false)
    await loadFactors()
  }

  async function disableMFA() {
    if (!totpFactor) return

    setUnenrolling(true)
    setError(null)

    const { error } = await supabase.auth.mfa.unenroll({
      factorId: totpFactor.id,
    })

    if (error) {
      setError('Error al desactivar. Intente de nuevo.')
      setUnenrolling(false)
      return
    }

    setSuccess('Autenticación de dos factores desactivada.')
    setTotpFactor(null)
    setUnenrolling(false)
  }

  function cancelEnrollment() {
    setQrCode(null)
    setSecret(null)
    setTotpUri(null)
    setFactorId(null)
    setVerifyCode('')
    setEnrolling(false)
    setError(null)
    setCopied(false)
  }

  async function copySecret() {
    if (!secret) return
    await navigator.clipboard.writeText(secret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4 py-16">
      <div className="w-full max-w-md">
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
            Configuración
          </p>
          <h1 className="mt-1 font-cinzel text-2xl font-bold uppercase tracking-widest text-gold">
            Seguridad
          </h1>
        </div>

        <div className="border border-border bg-card-bg p-8">
          {error && (
            <p className="mb-4 border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p className="mb-4 border border-green-500/30 bg-green-950/30 px-4 py-3 text-sm text-green-400">
              {success}
            </p>
          )}

          <div className="mb-6 flex items-center gap-4">
            {totpFactor ? (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-green-950/30">
                <ShieldCheck size={24} className="text-green-400" />
              </div>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                <Shield size={24} className="text-gold" />
              </div>
            )}
            <div>
              <h2 className="font-montserrat text-sm font-bold text-text-light">
                Autenticación de dos factores (2FA)
              </h2>
              <p className="font-montserrat text-xs text-text-muted">
                {totpFactor ? 'Activo — Protección adicional habilitada' : 'Inactivo — Proteja su cuenta'}
              </p>
            </div>
          </div>

          {!totpFactor && !qrCode && (
            <>
              <p className="mb-6 font-montserrat text-sm leading-relaxed text-text-muted">
                La autenticación de dos factores añade una capa extra de seguridad a su cuenta.
                Necesitará una aplicación como Google Authenticator o Authy en su teléfono.
              </p>
              <button
                type="button"
                onClick={startEnrollment}
                disabled={enrolling}
                className="w-full border border-gold bg-gold py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enrolling ? 'Configurando...' : 'Activar 2FA'}
              </button>
            </>
          )}

          {qrCode && (
            <>
              {/* Paso 1: Instrucciones */}
              <div className="mb-6 rounded border border-gold/20 bg-gold/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Smartphone size={18} className="text-gold" />
                  <span className="font-montserrat text-sm font-semibold text-gold">
                    Paso 1: Escanea el código QR
                  </span>
                </div>
                <p className="font-montserrat text-xs leading-relaxed text-text-muted">
                  Abre <strong className="text-text-light">Google Authenticator</strong> o{' '}
                  <strong className="text-text-light">Microsoft Authenticator</strong> en tu celular
                  y escanea el código QR apuntando la cámara.
                </p>
              </div>

              {/* Código QR */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-lg bg-white p-4 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrCode} alt="Código QR para 2FA" className="h-48 w-48" />
                </div>
              </div>

              {/* Opción manual */}
              <div className="mb-6 rounded border border-border bg-primary/30 p-4">
                <p className="mb-2 font-montserrat text-xs font-semibold uppercase tracking-wider text-text-muted">
                  ¿No puedes escanear? Ingresa la clave manualmente:
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 break-all rounded border border-border bg-card-bg px-3 py-2 font-mono text-sm text-gold">
                    {secret}
                  </code>
                  <button
                    type="button"
                    onClick={copySecret}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-border bg-card-bg text-text-muted transition-colors hover:border-gold hover:text-gold"
                    title="Copiar clave"
                  >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="mt-2 font-montserrat text-[10px] text-text-muted/60">
                  En la app, selecciona &quot;Agregar cuenta&quot; → &quot;Ingresar clave manualmente&quot; y pega este código.
                </p>
              </div>

              {/* Nota sobre desktop */}
              <p className="mb-6 rounded border border-amber-500/20 bg-amber-950/20 px-3 py-2 font-montserrat text-[11px] text-amber-400/80">
                <strong>Nota:</strong> Si estás en una computadora, debes escanear el QR con tu teléfono.
                El link directo (otpauth://) solo funciona en dispositivos móviles.
              </p>

              {/* Paso 2: Verificación */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 font-montserrat text-xs font-bold text-gold">
                  2
                </div>
                <span className="font-montserrat text-sm font-semibold text-text-light">
                  Ingresa el código de 6 dígitos
                </span>
              </div>

              <form onSubmit={verifyEnrollment} className="space-y-4">
                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                    required
                    autoComplete="one-time-code"
                    className="w-full border border-border bg-card-bg px-4 py-3 text-center font-mono text-2xl tracking-[0.5em] text-text-light placeholder-text-muted/50 outline-none focus:border-gold"
                    placeholder="000000"
                  />
                  <p className="mt-1 text-center font-montserrat text-[10px] text-text-muted/60">
                    El código cambia cada 30 segundos
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={cancelEnrollment}
                    className="flex-1 border border-border py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-text-muted transition-colors hover:bg-white/5"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={verifying || verifyCode.length !== 6}
                    className="flex-1 border border-gold bg-gold py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {verifying ? 'Verificando...' : 'Activar 2FA'}
                  </button>
                </div>
              </form>
            </>
          )}

          {totpFactor && (
            <>
              <p className="mb-6 font-montserrat text-sm leading-relaxed text-text-muted">
                Su cuenta está protegida con autenticación de dos factores.
                Cada vez que inicie sesión desde un nuevo dispositivo, deberá ingresar un código de su aplicación autenticadora.
              </p>
              <button
                type="button"
                onClick={disableMFA}
                disabled={unenrolling}
                className="w-full border border-red-500/50 py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-red-400 transition-colors hover:bg-red-950/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {unenrolling ? 'Desactivando...' : 'Desactivar 2FA'}
              </button>
            </>
          )}
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 font-montserrat text-xs text-text-muted hover:text-gold"
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
