'use client'

// IMPERIUM IURIS — T07 Formulario de contacto + mapa
// Módulo: M1 — Sitio Web Público
// RF: RF-52, RF-53, RF-54
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import type { UseFormSetValue } from 'react-hook-form'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import { CONTACT, contactTypes } from '@/lib/constants'
import { contactSchema, type ContactFormData } from '@/lib/schemas'

// Componente headless: lee ?tipo= de la URL y sincroniza con el formulario.
// Necesita Suspense porque useSearchParams suspende en el servidor.
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
  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { tipoConsulta: 'personal', confidencial: true },
  })

  const onSubmit = handleSubmit(async (data) => {
    setServerError(null)
    setSent(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setServerError('Error al enviar la consulta. Por favor inténtelo nuevamente o contáctenos por teléfono.')
    }
  })

  const mapUrl = useMemo(
    () => `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`,
    [],
  )

  return (
    <main className="bg-primary px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Contacto"
          title="Consulta confidencial"
          subtitle="Comparta la información esencial de su caso para activar una evaluación jurídica inicial."
        />

        <Suspense fallback={null}>
          <TipoConsultaSync setValue={setValue} />
        </Suspense>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={onSubmit} className="border border-border bg-card-bg p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Nombre completo" error={errors.nombre?.message}>
                <input {...register('nombre')} className="input-dark" placeholder=" " />
              </Field>
              <Field label="Correo electrónico" error={errors.correo?.message}>
                <input {...register('correo')} type="email" className="input-dark" placeholder=" " />
              </Field>
              <Field label="Teléfono" error={errors.telefono?.message}>
                <input {...register('telefono')} className="input-dark" placeholder=" " />
              </Field>
              <Field label="Tipo de consulta" error={errors.tipoConsulta?.message}>
                <select {...register('tipoConsulta')} className="input-dark">
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
                className="input-dark resize-none"
                placeholder=" "
              />
            </Field>

            <label className="mt-5 flex gap-3 text-sm font-light text-text-muted">
              <input {...register('confidencial')} type="checkbox" className="mt-1 accent-gold" defaultChecked />
              Entiendo que mi consulta es estrictamente confidencial.
            </label>
            {errors.confidencial ? (
              <p className="mt-2 text-sm text-red-300">{errors.confidencial.message}</p>
            ) : null}

            <Button type="submit" className="mt-7 w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar consulta confidencial'}
            </Button>

            {serverError ? (
              <p className="mt-5 border border-red-500/50 bg-primary p-4 text-sm text-red-300">
                {serverError}
              </p>
            ) : null}

            {sent ? (
              <p className="mt-5 border border-gold/50 bg-primary p-4 text-sm text-gold-light">
                Consulta recibida. Le confirmaremos por correo electrónico en breve.
              </p>
            ) : null}
          </form>

          <aside className="space-y-6">
            <div className="border border-border bg-card-bg p-7">
              <h2 className="font-cinzel text-2xl font-semibold text-gold">Información de contacto</h2>
              <div className="mt-6 space-y-4 text-sm font-light text-text-muted">
                <Info icon={MapPin} text={CONTACT.address} />
                <Info icon={Phone} text={CONTACT.phone} />
                <Info icon={Mail} text={CONTACT.email} />
                <Info icon={Clock} text={`${CONTACT.hours} | Emergencias: ${CONTACT.emergency}`} />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {CONTACT.social.map((item) => (
                  <span
                    key={item}
                    className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-gold-light"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="overflow-hidden border border-border bg-card-bg">
              <iframe
                title="Mapa Guayaquil Imperium Iuris"
                src={mapUrl}
                className="h-80 w-full grayscale invert"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </div>
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
      <span className="mb-2 block font-montserrat text-sm font-medium text-text-light">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-sm text-red-300">{error}</span> : null}
    </label>
  )
}

function Info({ icon: Icon, text }: { icon: typeof MapPin; text: string }) {
  return (
    <p className="flex gap-3">
      <Icon size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
      <span>{text}</span>
    </p>
  )
}
