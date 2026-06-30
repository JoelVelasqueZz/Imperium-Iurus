'use client'

import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDays, Clock, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import ChatInviteBanner from '@/components/shared/ChatInviteBanner'
import LoginModal from '@/components/shared/LoginModal'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { appointmentSchema, type AppointmentFormData } from '@/lib/schemas'

const TIPOS = [
  { value: 'personal',    label: 'Consulta personal' },
  { value: 'empresarial', label: 'Consulta empresarial' },
  { value: 'urgencia',    label: 'Urgencia penal' },
] as const

function Field({
  label, error, children, className = '',
}: {
  label: string; error?: string; children: React.ReactNode; className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-montserrat text-sm font-medium text-primary">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  )
}

export default function AgendaPage() {
  const supabase = createSupabaseBrowserClient()

  const [todayStr, setTodayStr]         = useState('')
  const [slots, setSlots]               = useState<string[]>([])
  const [loadingSlots, setLoading]      = useState(false)
  const [slotsMsg, setSlotsMsg]         = useState<string | null>(null)
  const [sent, setSent]                 = useState(false)
  const [serverError, setServerError]   = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn]     = useState<boolean | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [pendingData, setPendingData]   = useState<AppointmentFormData | null>(null)

  useEffect(() => {
    setTodayStr(new Date().toLocaleDateString('en-CA', { timeZone: 'America/Guayaquil' }))
  }, [])

  const {
    register, handleSubmit, watch, reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  })

  const fechaValue = watch('fecha')

  useEffect(() => {
    if (!fechaValue) return
    setSlotsMsg(null)
    setSlots([])

    const day = new Date(fechaValue + 'T12:00:00').getDay()
    if (day === 0 || day === 6) {
      setSlotsMsg('Los sábados y domingos no hay atención. Seleccione un día hábil.')
      return
    }

    setLoading(true)
    fetch(`/api/appointments?fecha=${fechaValue}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setSlots(json.data.slots)
          if (json.data.slots.length === 0) setSlotsMsg('No hay horarios disponibles para este día.')
        }
      })
      .catch(() => setSlotsMsg('Error al cargar horarios. Intente nuevamente.'))
      .finally(() => setLoading(false))
  }, [fechaValue])

  const submitFormData = useCallback(async (data: AppointmentFormData) => {
    setServerError(null)
    setSent(false)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setServerError(json.error ?? 'Error al agendar. Intente nuevamente.')
        reset(data)
        return
      }
      setSent(true)
      reset()
      setSlots([])
      setSlotsMsg(null)
    } catch {
      setServerError('Error de conexión. Por favor inténtelo nuevamente.')
      reset(data)
    }
  }, [reset])

  // Verificar sesión al montar + auto-enviar si hay datos pendientes de antes del login OAuth
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user)
      if (!user) return

      const saved = sessionStorage.getItem('pending_agenda')
      if (!saved) return
      try {
        const data = JSON.parse(saved) as AppointmentFormData
        sessionStorage.removeItem('pending_agenda')
        submitFormData(data)
      } catch {
        sessionStorage.removeItem('pending_agenda')
      }
    })
  }, [supabase, submitFormData])

  const onSubmit = handleSubmit(async (data) => {
    if (!isLoggedIn) {
      setPendingData(data)
      setShowLoginModal(true)
      return
    }
    await submitFormData(data)
  })

  return (
    <main className="relative bg-[#F5F3EE] px-4 pb-24 pt-60 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-32 bg-primary -z-10" />
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Agenda tu cita"
          title="Reserva una consulta confidencial"
          subtitle="Selecciona fecha y horario disponible. Te confirmaremos por correo a la brevedad."
          invert
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* ─── Formulario ─── */}
          <form onSubmit={onSubmit} className="border border-gold/20 bg-[#F5F3EE] p-6 md:p-8">

            {sent ? (
              <div className="border border-gold/50 bg-gold/10 p-6 text-center">
                <CalendarDays className="mx-auto mb-3 text-gold" size={32} />
                <p className="font-cinzel text-lg font-semibold text-primary">¡Cita agendada!</p>
                <p className="mt-2 text-sm font-light text-primary/70">
                  Recibirá un correo de confirmación. Nuestro equipo lo contactará para confirmar el horario.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-5 text-xs font-bold uppercase tracking-widest text-gold underline-offset-4 hover:underline"
                >
                  Agendar otra cita
                </button>
                <ChatInviteBanner />
              </div>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Nombre completo" error={errors.nombre?.message}>
                    <input {...register('nombre')} className="input-light" placeholder=" " />
                  </Field>
                  <Field label="Correo electrónico" error={errors.correo?.message}>
                    <input {...register('correo')} type="email" className="input-light" placeholder=" " />
                  </Field>
                  <Field label="Teléfono" error={errors.telefono?.message}>
                    <input {...register('telefono')} className="input-light" placeholder=" " />
                  </Field>
                  <Field label="Tipo de consulta" error={errors.tipoConsulta?.message}>
                    <select {...register('tipoConsulta')} className="input-light">
                      <option value="">Seleccione...</option>
                      {TIPOS.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Fecha" error={errors.fecha?.message}>
                    <input
                      {...register('fecha')}
                      type="date"
                      min={todayStr}
                      className="input-light"
                    />
                  </Field>
                  <Field label="Horario disponible" error={errors.hora?.message}>
                    {loadingSlots ? (
                      <div className="input-light flex items-center gap-2 text-primary/50">
                        <Loader2 size={14} className="animate-spin" /> Cargando horarios...
                      </div>
                    ) : (
                      <select
                        {...register('hora')}
                        className="input-light disabled:opacity-50"
                        disabled={slots.length === 0}
                      >
                        <option value="">
                          {fechaValue ? (slotsMsg ?? 'Seleccione horario') : 'Seleccione fecha primero'}
                        </option>
                        {slots.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    )}
                    {slotsMsg && !loadingSlots ? (
                      <span className="mt-2 block text-sm text-amber-600">{slotsMsg}</span>
                    ) : null}
                  </Field>
                </div>

                <Field label="Notas adicionales (opcional)" className="mt-5">
                  <textarea
                    {...register('mensaje')}
                    rows={4}
                    maxLength={500}
                    className="input-light resize-none"
                    placeholder="Describa brevemente el asunto si lo desea..."
                  />
                </Field>

                <Button type="submit" className="mt-7 w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Agendando...' : 'Confirmar cita'}
                </Button>

                {serverError ? (
                  <p className="mt-5 border border-red-400/50 bg-red-50 p-4 text-sm text-red-600">
                    {serverError}
                  </p>
                ) : null}
              </>
            )}
          </form>

          {/* ─── Sidebar informativo ─── */}
          <aside className="space-y-5">
            <div className="border border-gold/20 bg-[#F5F3EE] p-6">
              <h2 className="font-cinzel text-lg font-semibold text-gold">Horario de atención</h2>
              <div className="mt-4 space-y-2 text-sm font-light text-primary/70">
                <p className="flex items-center gap-2">
                  <Clock size={14} className="shrink-0 text-gold" />
                  Lunes a viernes, 08:00 – 18:00
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={14} className="shrink-0 text-gold" />
                  Citas de 30 minutos
                </p>
              </div>
              <div className="mt-5 border-t border-gold/20 pt-5">
                <p className="text-xs font-light leading-relaxed text-primary/60">
                  Para urgencias penales fuera de horario, contáctenos directamente por WhatsApp. Respondemos las 24 horas.
                </p>
                <a
                  href="https://wa.me/593985222635"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-gold hover:text-gold/80"
                >
                  WhatsApp urgencias →
                </a>
              </div>
            </div>

            <div className="border border-gold/20 bg-[#F5F3EE] p-6">
              <h2 className="font-cinzel text-lg font-semibold text-gold">¿Qué esperar?</h2>
              <ol className="mt-4 space-y-3 text-sm font-light text-primary/70">
                {[
                  'Confirme su cita con este formulario.',
                  'Recibirá un correo de confirmación.',
                  'Nuestro equipo lo contactará para preparar la sesión.',
                  'Consulta inicial confidencial y estratégica.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-gold/40 font-cinzel text-[10px] text-gold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>

      <LoginModal
        open={showLoginModal}
        storageKey="pending_agenda"
        formData={pendingData}
        returnPath="/agenda"
        onClose={() => setShowLoginModal(false)}
        onContinue={() => {
          setShowLoginModal(false)
          if (pendingData) submitFormData(pendingData)
        }}
      />
    </main>
  )
}
