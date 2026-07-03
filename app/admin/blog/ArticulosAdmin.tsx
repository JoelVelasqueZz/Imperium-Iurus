'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'

export type Articulo = {
  id: string
  titulo: string
  slug: string
  categoria: string
  resumen: string
  tiempo_lectura: string
  publicado: boolean
  created_at: string
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { timeZone: 'America/Guayaquil', dateStyle: 'medium' })
}

export default function ArticulosAdmin({ articulos: initial }: { articulos: Articulo[] }) {
  const [articulos, setArticulos] = useState(initial)
  const [updating, setUpdating]   = useState<string | null>(null)
  const router = useRouter()

  async function togglePublicado(art: Articulo) {
    setUpdating(art.id)
    try {
      const res = await fetch(`/api/admin/articulos/${art.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicado: !art.publicado }),
      })
      if (res.ok) setArticulos((prev) => prev.map((a) => a.id === art.id ? { ...a, publicado: !a.publicado } : a))
    } finally { setUpdating(null) }
  }

  async function deleteArticulo(id: string) {
    if (!confirm('¿Eliminar este artículo? Esta acción no se puede deshacer.')) return
    setUpdating(id)
    try {
      const res = await fetch(`/api/admin/articulos/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setArticulos((prev) => prev.filter((a) => a.id !== id))
        router.refresh()
      }
    } finally { setUpdating(null) }
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <Link href="/admin/blog/nuevo"
          className="flex items-center gap-2 border border-gold bg-gold px-5 py-2.5 font-montserrat text-xs font-bold uppercase tracking-widest text-primary hover:bg-gold/90">
          <Plus size={14} /> Nuevo artículo
        </Link>
      </div>

      {articulos.length === 0 ? (
        <p className="py-16 text-center text-text-muted">No hay artículos. Crea el primero.</p>
      ) : (
        <div className="space-y-2">
          {articulos.map((art) => (
            <div key={art.id} className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card-bg p-4 transition-colors hover:border-gold/30">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${art.publicado ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-zinc-500/50 bg-zinc-500/10 text-zinc-400'}`}>
                    {art.publicado ? 'Publicado' : 'Borrador'}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-gold/60">{art.categoria}</span>
                  <span className="text-[10px] text-text-muted">{art.tiempo_lectura}</span>
                </div>
                <p className="mt-1.5 font-cinzel text-sm font-semibold text-text-light">{art.titulo}</p>
                <p className="text-xs text-text-muted">/{art.slug} · {fmtDate(art.created_at)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => togglePublicado(art)} disabled={updating === art.id} title={art.publicado ? 'Despublicar' : 'Publicar'}
                  className="rounded border border-border p-2 text-text-muted transition-colors hover:border-gold hover:text-gold disabled:opacity-40">
                  {art.publicado ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <Link href={`/admin/blog/${art.id}/editar`}
                  className="rounded border border-border p-2 text-text-muted transition-colors hover:border-gold hover:text-gold">
                  <Edit2 size={14} />
                </Link>
                <button type="button" onClick={() => deleteArticulo(art.id)} disabled={updating === art.id}
                  className="rounded border border-border p-2 text-text-muted transition-colors hover:border-red-500 hover:text-red-400 disabled:opacity-40">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
