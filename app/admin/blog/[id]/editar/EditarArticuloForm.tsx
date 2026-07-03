'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ArticuloFormFields, type ArticuloForm } from '@/components/admin/ArticuloFormFields'

export default function EditarArticuloForm({ id, initial }: { id: string; initial: ArticuloForm }) {
  const router = useRouter()
  const [prevInitial, setPrevInitial] = useState(initial)
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Si se navega de un artículo a otro sin recargar, esto evita que el
  // formulario quede mostrando los datos del artículo anterior.
  if (initial !== prevInitial) {
    setPrevInitial(initial)
    setForm(initial)
  }

  function handleChange(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/articulos/${id}`, {
        method: 'PATCH',
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
        <h1 className="mt-3 font-cinzel text-2xl font-bold uppercase tracking-wider text-gold">Editar artículo</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <ArticuloFormFields form={form} onChange={handleChange} />
        {error && <p className="border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-400">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="border border-gold bg-gold px-8 py-3 font-montserrat text-xs font-bold uppercase tracking-widest text-primary hover:bg-gold/90 disabled:opacity-60">
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <Link href="/admin/blog" className="border border-border px-8 py-3 font-montserrat text-xs uppercase tracking-widest text-text-muted hover:border-gold hover:text-gold">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
