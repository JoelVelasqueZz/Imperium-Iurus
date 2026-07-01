'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { HOME, trustCards } from '@/lib/constants'
import { useSiteConfig, useUpdateConfig } from '@/components/providers/ConfigProvider'
import EditableSection from '@/components/admin/EditableSection'
import SectionEditModal from '@/components/admin/SectionEditModal'
import { Field, Input, Textarea } from '@/components/admin/ConfigFormControls'

export default function TrustBlock() {
  const [modalOpen, setModalOpen] = useState(false)
  const { trust_block } = useSiteConfig()
  const updateConfig = useUpdateConfig()
  return (
    <>
    <EditableSection onEdit={() => setModalOpen(true)}>
    <section className="bg-primary px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={HOME.trust.eyebrow}
          title={trust_block.titulo}
          subtitle={trust_block.subtitulo}
        />
        <motion.div
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ show: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
        >
          {trustCards.map(({ icon: Icon, sub }, index) => {
            const { title, body } = trust_block.tarjetas[index] ?? trustCards[index]
            return (
              <motion.article
                key={title}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                className="group border border-border bg-card-bg p-8 shadow-lg shadow-black/40 transition-all duration-300 hover:border-gold"
              >
                <Icon className="mb-5 text-gold" size={32} aria-hidden="true" />
                <h3 className="font-cinzel text-lg font-semibold tracking-wide text-text-light">{title}</h3>
                <p className="mt-4 font-inter text-sm font-light leading-7 text-text-muted">{body}</p>
                <p className="mt-5 border-t border-border pt-4 font-inter text-xs font-medium uppercase tracking-widest text-gold">{sub}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
    </EditableSection>

    <SectionEditModal
      clave="trust_block"
      title="Editar bloque de confianza"
      value={trust_block}
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      onSaved={(v) => updateConfig('trust_block', v)}
    >
      {(draft, setDraft) => (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Título de la sección">
              <Input value={draft.titulo} onChange={(e) => setDraft((p) => ({ ...p, titulo: e.target.value }))} />
            </Field>
            <Field label="Subtítulo de la sección">
              <Input value={draft.subtitulo} onChange={(e) => setDraft((p) => ({ ...p, subtitulo: e.target.value }))} />
            </Field>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {draft.tarjetas.map((tarjeta, i) => (
              <div key={i} className="space-y-2 border border-border bg-card-bg p-4">
                <Input
                  value={tarjeta.title}
                  placeholder="Título de la tarjeta"
                  onChange={(e) => setDraft((p) => ({
                    ...p,
                    tarjetas: p.tarjetas.map((t, idx) => (idx === i ? { ...t, title: e.target.value } : t)),
                  }))}
                />
                <Textarea
                  rows={2}
                  value={tarjeta.body}
                  placeholder="Descripción"
                  onChange={(e) => setDraft((p) => ({
                    ...p,
                    tarjetas: p.tarjetas.map((t, idx) => (idx === i ? { ...t, body: e.target.value } : t)),
                  }))}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </SectionEditModal>
    </>
  )
}
