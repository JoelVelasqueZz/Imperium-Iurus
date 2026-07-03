'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import Reveal from '@/components/ui/Reveal'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import { buildWhatsAppUrl } from '@/lib/config-utils'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea, ListEditor } from '@/components/admin/ConfigFormControls'

export default function UrgencyBlock() {
  const [modalOpen, setModalOpen] = useState(false)
  const { contacto, urgency_block } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  const waUrl = buildWhatsAppUrl(contacto.whatsapp, contacto.whatsapp_mensaje)
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="border-y border-gold/50 bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={urgency_block.eyebrow}
          title={urgency_block.titulo}
          subtitle={urgency_block.texto_principal}
        />
        <p className="mb-12 text-center font-cinzel text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {urgency_block.badge}
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          {urgency_block.escenarios.map((item, index) => (
            <Reveal key={item.titulo} delay={index * 0.08}>
              <article className="h-full border border-border bg-card-bg p-7">
                <h3 className="font-cinzel text-xl font-semibold tracking-wide text-text-light">{item.titulo}</h3>
                <p className="mt-3 font-cinzel text-sm font-semibold tracking-wide text-gold">{item.subtitulo}</p>
                <ul className="mt-6 space-y-2 font-inter text-sm font-light text-text-muted">
                  {item.items.map((listItem) => (
                    <li key={listItem} className="border-l border-gold/40 pl-3">{listItem}</li>
                  ))}
                </ul>
                <Button
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="mt-7 w-full px-4"
                >
                  {item.boton}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/contacto?tipo=urgencia" className="animate-pulse-gold bg-gold-bright px-10 py-5 text-base">
            {urgency_block.cta} <ArrowRight size={18} />
          </Button>
          <p className="mt-4 font-inter text-xs font-medium uppercase tracking-[0.24em] text-text-muted">
            {urgency_block.footer}
          </p>
        </div>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="urgency_block"
      title="Editar bloque de urgencia"
      value={urgency_block}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('urgency_block', v)}
    >
      {(draft, setDraft) => (
        <>
          <Field label="Eyebrow (texto pequeño superior)">
            <Input value={draft.eyebrow} onChange={(e) => setDraft((p) => ({ ...p, eyebrow: e.target.value }))} />
          </Field>
          <Field label="Título">
            <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
          </Field>
          <Field label="Texto principal de la sección">
            <Textarea
              rows={2}
              value={draft.texto_principal}
              onChange={(e) => setDraft((p) => ({ ...p, texto_principal: e.target.value }))}
            />
          </Field>
          <Field label="Badge (línea dorada)">
            <Input value={draft.badge} onChange={(e) => setDraft((p) => ({ ...p, badge: e.target.value }))} />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Texto del botón CTA">
              <Input value={draft.cta} onChange={(e) => setDraft((p) => ({ ...p, cta: e.target.value }))} />
            </Field>
            <Field label="Texto footer">
              <Input value={draft.footer} onChange={(e) => setDraft((p) => ({ ...p, footer: e.target.value }))} />
            </Field>
          </div>
          <div className="space-y-4">
            {draft.escenarios.map((esc, i) => (
              <div key={i} className="space-y-3 border border-border bg-card-bg p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="Título">
                    <Input
                      value={esc.titulo}
                      onChange={(e) => setDraft((p) => ({
                        ...p,
                        escenarios: p.escenarios.map((x, idx) => (idx === i ? { ...x, titulo: e.target.value } : x)),
                      }))}
                    />
                  </Field>
                  <Field label="Subtítulo">
                    <Input
                      value={esc.subtitulo}
                      onChange={(e) => setDraft((p) => ({
                        ...p,
                        escenarios: p.escenarios.map((x, idx) => (idx === i ? { ...x, subtitulo: e.target.value } : x)),
                      }))}
                    />
                  </Field>
                </div>
                <Field label="Lista de items">
                  <ListEditor
                    items={esc.items}
                    onChange={(items) => setDraft((p) => ({
                      ...p,
                      escenarios: p.escenarios.map((x, idx) => (idx === i ? { ...x, items } : x)),
                    }))}
                    placeholder="Agregar item..."
                  />
                </Field>
                <Field label="Texto del botón">
                  <Input
                    value={esc.boton}
                    onChange={(e) => setDraft((p) => ({
                      ...p,
                      escenarios: p.escenarios.map((x, idx) => (idx === i ? { ...x, boton: e.target.value } : x)),
                    }))}
                  />
                </Field>
              </div>
            ))}
          </div>
        </>
      )}
    </SectionEditModal>
    </>
  )
}
