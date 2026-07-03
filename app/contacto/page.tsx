'use client'

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import type { UseFormSetValue } from 'react-hook-form'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import ChatInviteBanner from '@/components/shared/ChatInviteBanner'
import LoginModal from '@/components/shared/LoginModal'
import ContactInfoBlock from '@/components/contacto/ContactInfoBlock'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { contactTypes } from '@/lib/constants'
import { contactSchema, type ContactFormData } from '@/lib/schemas'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field as ConfigField, Input as ConfigInput, Textarea as ConfigTextarea } from '@/components/admin/ConfigFormControls'

function TipoConsultaSync({ setValue }: { setValue: UseFormSetValue<ContactFormData> }) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const tipo = searchParams.get('tipo') as ContactFormData['tipoConsulta'] | null
    if (tipo && contactSchema.shape.tipoConsulta.options.includes(tipo)) {
      setValue('tipoConsulta', tipo, { shouldValidate: false })
    }
  }, [searchParams, setValue])
  return null
}

export default function ContactoPage() {
  const supabase = createSupabaseBrowserClient()
  const { contacto_page, contacto } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  const [headerModalOpen, setHeaderModalOpen] = useState(false)

  const [sent, setSent]                   = useState(false)
  const [serverError, setServerError]     = useState<string | null>(null)
  const isLoggedInRef = useRef<boolean | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [pendingData, setPendingData]     = useState<ContactFormData | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { tipoConsulta: 'personal', confidencial: true },
  })

  const submitFormData = useCallback(async (data: ContactFormData) => {
    setServerError(null)
    setSent(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        setServerError('Error al enviar la consulta. Por favor inténtelo nuevamente o contáctenos por teléfono.')
        reset(data)
        return
      }
      setSent(true)
      reset()
    } catch {
      setServerError('Error al enviar la consulta. Por favor inténtelo nuevamente o contáctenos por teléfono.')
      reset(data)
    }
  }, [reset])

  // Verificar sesión al montar + auto-enviar si hay datos pendientes de antes del login OAuth
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      isLoggedInRef.current = !!user
      if (!user) return

      const saved = sessionStorage.getItem('pending_contacto')
      if (!saved) return
      try {
        const data = JSON.parse(saved) as ContactFormData
        sessionStorage.removeItem('pending_contacto')
        submitFormData(data)
      } catch {
        sessionStorage.removeItem('pending_contacto')
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

  const mapUrl = useMemo(
    () => `https://www.google.com/maps?q=${encodeURIComponent(contacto.direccion)}&output=embed`,
    [contacto.direccion],
  )

  return (
    <main className="relative bg-[#F5F3EE] px-4 pb-24 pt-60 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-32 bg-primary -z-10" />
      <div className="mx-auto max-w-7xl">
        <EditableSection onEdit={() => setHeaderModalOpen(true)} topSafe>
          <SectionHeader
            eyebrow={contacto_page.eyebrow}
            title={contacto_page.titulo}
            subtitle={contacto_page.subtitulo}
            invert
          />
        </EditableSection>

        <Suspense fallback={null}>
          <TipoConsultaSync setValue={setValue} />
        </Suspense>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ─── Formulario — fondo marfil ─── */}
          <form onSubmit={onSubmit} className="border border-gold/20 bg-[#F5F3EE] p-6 md:p-8">
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
                  {contactTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Mensaje" error={errors.mensaje?.message} className="mt-5">
              <textarea
                {...register('mensaje')}
                rows={6}
                maxLength={500}
                className="input-light resize-none"
                placeholder=" "
              />
            </Field>

            <label className="mt-5 flex gap-3 text-sm font-light text-primary/70">
              <input {...register('confidencial')} type="checkbox" className="mt-1 accent-gold" defaultChecked />
              Entiendo que mi consulta es estrictamente confidencial.
            </label>
            {errors.confidencial ? (
              <p className="mt-2 text-sm text-red-600">{errors.confidencial.message}</p>
            ) : null}

            <Button type="submit" className="mt-7 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar consulta confidencial'}
            </Button>

            {serverError ? (
              <p className="mt-5 border border-red-400/50 bg-red-50 p-4 text-sm text-red-600">
                {serverError}
              </p>
            ) : null}

            {sent ? (
              <>
                <p className="mt-5 border border-gold/50 bg-gold/10 p-4 text-sm text-primary">
                  Consulta recibida. Le confirmaremos por correo electrónico en breve.
                </p>
                <ChatInviteBanner />
              </>
            ) : null}
          </form>

          {/* ─── Aside — fondo marfil ─── */}
          <aside className="space-y-6">
            <ContactInfoBlock />
            <div className="overflow-hidden border border-gold/20 bg-[#F5F3EE]">
              <iframe
                title="Mapa Guayaquil Imperium Iuris"
                src={mapUrl}
                className="h-80 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-popups"
              />
            </div>
          </aside>
        </div>
      </div>

      <LoginModal
        open={showLoginModal}
        storageKey="pending_contacto"
        formData={pendingData}
        returnPath="/contacto"
        onClose={() => setShowLoginModal(false)}
        onContinue={() => {
          setShowLoginModal(false)
          if (pendingData) submitFormData(pendingData)
        }}
      />

      <SectionEditModal
        clave="contacto_page"
        title="Editar título y subtítulo — Contacto"
        value={contacto_page}
        open={headerModalOpen}
        onClose={() => setHeaderModalOpen(false)}
        onSaved={(v) => updateConfig('contacto_page', v)}
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
    </main>
  )
}

function Field({
  label,
  error,
  children,
  className = '',
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-montserrat text-sm font-medium text-primary">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
    </label>
  )
}
