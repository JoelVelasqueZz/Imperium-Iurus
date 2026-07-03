'use client'

import dynamic from 'next/dynamic'

const TipTapEditor = dynamic(() => import('@/components/admin/TipTapEditor'), { ssr: false })

export type ArticuloForm = {
  titulo: string
  slug: string
  categoria: string
  resumen: string
  contenido: string
  tiempo_lectura: string
  publicado: boolean
}

export function ArticuloFormFields({
  form, onChange,
}: {
  form: ArticuloForm
  onChange: (field: string, value: string | boolean) => void
}) {
  return (
    <>
      <Field label="Título">
        <input value={form.titulo} onChange={(e) => onChange('titulo', e.target.value)} required
          className="w-full border border-border bg-card-bg px-4 py-3 text-sm text-text-light outline-none focus:border-gold" />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Slug (URL)">
          <input value={form.slug} onChange={(e) => onChange('slug', e.target.value)} required
            pattern="[a-z0-9-]+" title="Solo letras minúsculas, números y guiones"
            className="w-full border border-border bg-card-bg px-4 py-3 text-sm text-text-light outline-none focus:border-gold" />
        </Field>
        <Field label="Categoría">
          <input value={form.categoria} onChange={(e) => onChange('categoria', e.target.value)} required
            placeholder="Derecho Penal"
            className="w-full border border-border bg-card-bg px-4 py-3 text-sm text-text-light outline-none focus:border-gold" />
        </Field>
        <Field label="Tiempo de lectura">
          <input value={form.tiempo_lectura} onChange={(e) => onChange('tiempo_lectura', e.target.value)}
            placeholder="5 min"
            className="w-full border border-border bg-card-bg px-4 py-3 text-sm text-text-light outline-none focus:border-gold" />
        </Field>
        <div>
          <span className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">Publicar</span>
          <label className="mt-2 flex cursor-pointer items-center gap-3 text-sm text-text-muted">
            <input type="checkbox" checked={form.publicado} onChange={(e) => onChange('publicado', e.target.checked)}
              className="h-4 w-4 accent-gold" />
            Publicado (visible en el blog)
          </label>
        </div>
      </div>
      <Field label="Resumen (excerpt)">
        <textarea value={form.resumen} onChange={(e) => onChange('resumen', e.target.value)} rows={2} maxLength={500}
          className="w-full resize-none border border-border bg-card-bg px-4 py-3 text-sm text-text-light outline-none focus:border-gold" />
      </Field>
      <Field label="Contenido">
        <TipTapEditor
          value={form.contenido}
          onChange={(html) => onChange('contenido', html)}
          placeholder="Escribe el contenido del artículo..."
        />
      </Field>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">{label}</span>
      {children}
    </label>
  )
}
