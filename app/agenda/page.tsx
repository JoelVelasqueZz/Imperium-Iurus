'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDays, Clock, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import ChatInviteBanner from '@/components/shared/ChatInviteBanner'
import LoginModal from '@/components/shared/LoginModal'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { appointmentSchema, type AppointmentFormData } from '@/lib/schemas'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field as ConfigField, Input as ConfigInput, Textarea as ConfigTextarea, ListEditor } from '@/components/admin/ConfigFormControls'

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
  const { horario_citas, festivos, agenda_page } = useSiteConfig()
  const updateConfig = useUpdateConfig()

  const [headerModalOpen, setHeaderModalOpen]   = useState(false)
  const [sidebarModalOpen, setSidebarModalOpen] = useState(false)
  const [todayStr]                      = useState(() => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Guayaquil' }))
  const [slots, setSlots]               = useState<string[]>([])
  const [loadingSlots, setLoading]      = useState(false)
  const [slotsMsg, setSlotsMsg]         = useState<string | null>(null)
  const [sent, setSent]                 = useState(false)
  const [serverError, setServerError]   = useState<string | null>(null)
  const isLoggedInRef = useRef<boolean | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [pendingData, setPendingData]   = useState<AppointmentFormData | null>(null)

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

    if (festivos.fechas.includes(fechaValue)) {
      setSlotsMsg('Esta fecha es festivo o día de excepción. Por favor seleccione otro día.')
      return
    }
    const day = new Date(fechaValue + 'T12:00:00').getDay()
    if (!horario_citas.dias.includes(day)) {
      setSlotsMsg('No hay atención ese día. Seleccione un día hábil según el horario configurado.')
      return
    }

    const controller = new AbortController()
    setLoading(true)
    fetch(`/api/appointments?fecha=${fechaValue}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setSlots(json.data.slots)
          if (json.data.slots.length === 0) setSlotsMsg('No hay horarios disponibles para este día.')
        }
      })
      .catch((err) => { if (err.name !== 'AbortError') setSlotsMsg('Error al cargar horarios. Intente nuevamente.') })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })

    // Si el usuario cambia de fecha antes de que responda el fetch anterior,
    // esto cancela esa petición para que su respuesta no pise la fecha actual.
    return () => controller.abort()
  }, [fechaValue, festivos.fechas, horario_citas.dias])

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
      isLoggedInRef.current = !!user
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
    if (!isLoggedInRef.current) {
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
        <EditableSection onEdit={() => setHeaderModalOpen(true)} topSafe>
          <SectionHeader
            eyebrow={agenda_page.eyebrow}
            title={agenda_page.titulo}
            subtitle={agenda_page.subtitulo}
            invert
          />
        </EditableSection>

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
          <EditableSection onEdit={() => setSidebarModalOpen(true)}>
          <aside className="space-y-5">
            <div className="border border-gold/20 bg-[#F5F3EE] p-6">
              <h2 className="font-cinzel text-lg font-semibold text-gold">{agenda_page.horario_titulo}</h2>
              <div className="mt-4 space-y-2 text-sm font-light text-primary/70">
                <p className="flex items-center gap-2">
                  <Clock size={14} className="shrink-0 text-gold" />
                  {agenda_page.horario_texto1}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={14} className="shrink-0 text-gold" />
                  {agenda_page.horario_texto2}
                </p>
              </div>
              <div className="mt-5 border-t border-gold/20 pt-5">
                <p className="text-xs font-light leading-relaxed text-primary/60">
                  {agenda_page.urgencia_texto}
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
              <h2 className="font-cinzel text-lg font-semibold text-gold">{agenda_page.pasos_titulo}</h2>
              <ol className="mt-4 space-y-3 text-sm font-light text-primary/70">
                {agenda_page.pasos.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-gold/40 font-cinzel text-[10px] text-gold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          </EditableSection>
        </div>
      </div>

      <SectionEditModal
        clave="agenda_page"
        title="Editar título y subtítulo — Agenda"
        value={agenda_page}
        open={headerModalOpen}
        onClose={() => setHeaderModalOpen(false)}
        onSaved={(v) => updateConfig('agenda_page', v)}
      >
        {(draft, setDraft) => (
          <>
            <ConfigField label="Eyebrow (texto pequeño superior)">
              <ConfigInput value={draft.eyebrow} onChange={(e) => setDraft((p) => ({ ...p, eyebrow: e.target.value }))} />
            </ConfigField>
            <ConfigField label="Título">
              <ConfigInput value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
            </ConfigField>
            <ConfigField label="Subtítulo">
              <ConfigTextarea rows={2} value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
            </ConfigField>
          </>
        )}
      </SectionEditModal>

      <SectionEditModal
        clave="agenda_page"
        title="Editar textos de ayuda lateral — Agenda"
        value={agenda_page}
        open={sidebarModalOpen}
        onClose={() => setSidebarModalOpen(false)}
        onSaved={(v) => updateConfig('agenda_page', v)}
      >
        {(draft, setDraft) => (
          <>
            <ConfigField label="Título — Horario de atención">
              <ConfigInput value={draft.horario_titulo} onChange={(e) => setDraft((p) => ({ ...p, horario_titulo: e.target.value }))} />
            </ConfigField>
            <ConfigField label="Horario — línea 1">
              <ConfigInput value={draft.horario_texto1} onChange={(e) => setDraft((p) => ({ ...p, horario_texto1: e.target.value }))} />
            </ConfigField>
            <ConfigField label="Horario — línea 2">
              <ConfigInput value={draft.horario_texto2} onChange={(e) => setDraft((p) => ({ ...p, horario_texto2: e.target.value }))} />
            </ConfigField>
            <ConfigField label="Texto de urgencias">
              <ConfigTextarea rows={2} value={draft.urgencia_texto} onChange={(e) => setDraft((p) => ({ ...p, urgencia_texto: e.target.value }))} />
            </ConfigField>
            <ConfigField label="Título — ¿Qué esperar?">
              <ConfigInput value={draft.pasos_titulo} onChange={(e) => setDraft((p) => ({ ...p, pasos_titulo: e.target.value }))} />
            </ConfigField>
            <ConfigField label="Pasos">
              <ListEditor
                items={draft.pasos}
                onChange={(pasos) => setDraft((p) => ({ ...p, pasos }))}
                placeholder="Agregar paso..."
              />
            </ConfigField>
          </>
        )}
      </SectionEditModal>

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
