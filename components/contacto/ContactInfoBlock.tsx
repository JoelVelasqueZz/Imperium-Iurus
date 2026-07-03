'use client'

import { useState } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input } from '@/components/admin/ConfigFormControls'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'

type ContactoWithRedes = {
  direccion: string
  telefono: string
  correo: string
  horas: string
  emergencia: string
  linkedin: string
  instagram: string
  facebook: string
}

export default function ContactInfoBlock() {
  const [modalOpen, setModalOpen] = useState(false)
  const { contacto, redes_sociales } = useSiteConfig()
  const updateConfig = useUpdateConfig()

  const combined: ContactoWithRedes = {
    direccion: contacto.direccion,
    telefono: contacto.telefono,
    correo: contacto.correo,
    horas: contacto.horas,
    emergencia: contacto.emergencia,
    linkedin: redes_sociales.linkedin,
    instagram: redes_sociales.instagram,
    facebook: redes_sociales.facebook,
  }

  const socialLinks = [
    { href: redes_sociales.linkedin, label: 'LinkedIn' },
    { href: redes_sociales.instagram, label: 'Instagram' },
    { href: redes_sociales.facebook, label: 'Facebook' },
  ].filter((s) => s.href)

  async function handleCustomSave(draft: ContactoWithRedes) {
    const [res1, res2] = await Promise.all([
      fetch('/api/admin/configuracion', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clave: 'contacto',
          valor: {
            ...contacto,
            direccion: draft.direccion,
            telefono: draft.telefono,
            correo: draft.correo,
            horas: draft.horas,
            emergencia: draft.emergencia,
          },
        }),
      }),
      fetch('/api/admin/configuracion', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clave: 'redes_sociales',
          valor: {
            linkedin: draft.linkedin,
            instagram: draft.instagram,
            facebook: draft.facebook,
          },
        }),
      }),
    ])

    if (!res1.ok || !res2.ok) {
      throw new Error('Error al guardar')
    }
  }

  function handleSaved(draft: ContactoWithRedes) {
    updateConfig('contacto', {
      ...contacto,
      direccion: draft.direccion,
      telefono: draft.telefono,
      correo: draft.correo,
      horas: draft.horas,
      emergencia: draft.emergencia,
    })
    updateConfig('redes_sociales', {
      linkedin: draft.linkedin,
      instagram: draft.instagram,
      facebook: draft.facebook,
    })
  }

  return (
    <>
      <EditableSection onEdit={() => setModalOpen(true)}>
        <div className="border border-gold/20 bg-[#F5F3EE] p-7">
          <h2 className="font-cinzel text-2xl font-semibold text-gold">Información de contacto</h2>
          <div className="mt-6 space-y-4 text-sm font-light text-primary/70">
            <Info icon={MapPin} text={contacto.direccion} />
            <Info icon={Phone} text={contacto.telefono} />
            <Info icon={Mail} text={contacto.correo} />
            <Info icon={Clock} text={`${contacto.horas} | Emergencias: ${contacto.emergencia}`} />
          </div>
          {socialLinks.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gold/40 px-4 py-2 text-xs uppercase tracking-widest text-gold transition-colors hover:border-gold hover:bg-gold hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </EditableSection>

      <SectionEditModal
        clave="contacto"
        title="Editar información de contacto"
        value={combined}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        customSave={handleCustomSave}
        onSaved={handleSaved}
      >
        {(draft, setDraft) => (
          <div className="space-y-5">
            <Field label="Dirección">
              <Input
                value={draft.direccion}
                onChange={(e) => setDraft((p) => ({ ...p, direccion: e.target.value }))}
              />
            </Field>
            <Field label="Teléfono">
              <Input
                value={draft.telefono}
                onChange={(e) => setDraft((p) => ({ ...p, telefono: e.target.value }))}
              />
            </Field>
            <Field label="Correo">
              <Input
                value={draft.correo}
                onChange={(e) => setDraft((p) => ({ ...p, correo: e.target.value }))}
              />
            </Field>
            <Field label="Horario de atención">
              <Input
                value={draft.horas}
                onChange={(e) => setDraft((p) => ({ ...p, horas: e.target.value }))}
              />
            </Field>
            <Field label="Texto emergencias">
              <Input
                value={draft.emergencia}
                onChange={(e) => setDraft((p) => ({ ...p, emergencia: e.target.value }))}
              />
            </Field>
            <div className="border-t border-border pt-5">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gold">Redes sociales</p>
              <div className="space-y-4">
                <Field label="LinkedIn (URL)">
                  <Input
                    value={draft.linkedin}
                    onChange={(e) => setDraft((p) => ({ ...p, linkedin: e.target.value }))}
                    placeholder="https://linkedin.com/company/..."
                  />
                </Field>
                <Field label="Instagram (URL)">
                  <Input
                    value={draft.instagram}
                    onChange={(e) => setDraft((p) => ({ ...p, instagram: e.target.value }))}
                    placeholder="https://instagram.com/..."
                  />
                </Field>
                <Field label="Facebook (URL)">
                  <Input
                    value={draft.facebook}
                    onChange={(e) => setDraft((p) => ({ ...p, facebook: e.target.value }))}
                    placeholder="https://facebook.com/..."
                  />
                </Field>
              </div>
            </div>
          </div>
        )}
      </SectionEditModal>
    </>
  )
}

function Info({ icon: Icon, text }: { icon: typeof MapPin; text: string }) {
  return (
    <p className="flex gap-3">
      <Icon size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
      <span className="text-primary/80">{text}</span>
    </p>
  )
}
