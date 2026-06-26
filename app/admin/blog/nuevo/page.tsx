'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ArticuloFormFields } from '@/components/admin/ArticuloFormFields'

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

