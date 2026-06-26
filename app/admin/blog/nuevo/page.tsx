'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

export default function NuevoArticuloPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    titulo: '', slug: '', categoria: '', resumen: '', contenido: '', tiempo_lectura: '5 min', publicado: false,
  })
  const [error,   setError]   = useState<string | null>(null)
  const [saving,  setSaving]  = useState(false)

  function handleChange(field: string, value: string | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'titulo') next.slug = slugify(value as string)
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const res = await fetch('/api/admin/articulos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? 'Error al guardar'); return }
      router.push('/admin/blog')
      router.refresh()
    } catch { setError('Error de conexión') }
    finally { setSaving(false) }
  }

  return (
    <div className="px-6 pb-16 pt-8">
      <div className="mb-6">
        <Link href="/admin/blog" className="inline-flex items-center gap-2 text-xs text-text-muted hover:text-gold">
          <ArrowLeft size={14} /> Volver al blog
        </Link>
        <h1 className="mt-3 font-cinzel text-2xl font-bold uppercase tracking-wider text-gold">Nuevo artículo</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <ArticuloFormFields form={form} onChange={handleChange} />
        {error && <p className="border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-400">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="border border-gold bg-gold px-8 py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-primary hover:bg-gold/90 disabled:opacity-60">
            {saving ? 'Guardando...' : 'Guardar artículo'}
          </button>
          <Link href="/admin/blog" className="border border-border px-8 py-3 font-montserrat text-xs uppercase tracking-widest text-text-muted hover:border-gold hover:text-gold">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}

export function ArticuloFormFields({
  form, onChange,
}: {
  form: { titulo: string; slug: string; categoria: string; resumen: string; contenido: string; tiempo_lectura: string; publicado: boolean }
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
        <Field label="Publicar">
          <label className="mt-2 flex cursor-pointer items-center gap-3 text-sm text-text-muted">
            <input type="checkbox" checked={form.publicado} onChange={(e) => onChange('publicado', e.target.checked)}
              className="h-4 w-4 accent-gold" />
            Publicado (visible en el blog)
          </label>
        </Field>
      </div>
      <Field label="Resumen (excerpt)">
        <textarea value={form.resumen} onChange={(e) => onChange('resumen', e.target.value)} rows={2} maxLength={500}
          className="w-full resize-none border border-border bg-card-bg px-4 py-3 text-sm text-text-light outline-none focus:border-gold" />
      </Field>
      <Field label="Contenido (HTML)">
        <textarea value={form.contenido} onChange={(e) => onChange('contenido', e.target.value)} rows={14} required
          placeholder="<p>Contenido del artículo...</p><h2>Subtítulo</h2><p>Más contenido...</p>"
          className="w-full resize-y border border-border bg-card-bg px-4 py-3 font-mono text-xs text-text-light outline-none focus:border-gold" />
        <p className="mt-1 text-[11px] text-text-muted">Usa HTML: &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;ul&gt;&lt;li&gt;</p>
      </Field>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted">{label}</label>
      {children}
    </div>
  )
}
