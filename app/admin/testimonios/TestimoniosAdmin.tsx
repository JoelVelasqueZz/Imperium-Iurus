'use client'

import { useState } from 'react'
import { CheckCircle, Star, Trash2, XCircle } from 'lucide-react'

export type Testimonio = {
  id: string
  nombre: string
  cargo: string | null
  empresa: string | null
  texto: string
  calificacion: number
  estado: string
  created_at: string
}

const ESTADO_STYLES: Record<string, string> = {
  pendiente:  'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
  aprobado:   'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
  rechazado:  'border-red-500/50 bg-red-500/10 text-red-400',
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-EC', { timeZone: 'America/Guayaquil', dateStyle: 'medium' })
}

const FILTERS = ['todos', 'pendiente', 'aprobado', 'rechazado']

export default function TestimoniosAdmin({ testimonios: initial }: { testimonios: Testimonio[] }) {
  const [testimonios, setTestimonios] = useState(initial)
  const [updating, setUpdating]       = useState<string | null>(null)
  const [filter, setFilter]           = useState('todos')

  async function changeEstado(id: string, estado: string) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/admin/testimonios/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
      })
      if (res.ok) setTestimonios((prev) => prev.map((t) => t.id === id ? { ...t, estado } : t))
    } finally { setUpdating(null) }
  }

  async function deleteTestimonio(id: string) {
    if (!confirm('¿Eliminar este testimonio permanentemente?')) return
    setUpdating(id)
    try {
      const res = await fetch(`/api/admin/testimonios/${id}`, { method: 'DELETE' })
      if (res.ok) setTestimonios((prev) => prev.filter((t) => t.id !== id))
    } finally { setUpdating(null) }
  }

  const visible = filter === 'todos' ? testimonios : testimonios.filter((t) => t.estado === filter)
  const counts = Object.fromEntries(FILTERS.map((f) => [f, f === 'todos' ? testimonios.length : testimonios.filter((t) => t.estado === f).length]))

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 font-montserrat text-xs uppercase tracking-widest transition-colors ${filter === f ? 'border-gold bg-gold text-primary' : 'border-gold/30 text-gold/70 hover:border-gold hover:text-gold'}`}>
            {f === 'todos' ? 'Todos' : f} ({counts[f]})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-text-muted">No hay testimonios {filter !== 'todos' ? `con estado "${filter}"` : ''}.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((t) => (
            <div key={t.id} className="flex flex-col border border-border bg-card-bg p-5">
              {/* Cabecera */}
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${ESTADO_STYLES[t.estado] ?? ''}`}>
                    {t.estado}
                  </span>
                  <p className="mt-2 font-cinzel text-sm font-semibold text-text-light">{t.nombre}</p>
                  {(t.cargo || t.empresa) && (
                    <p className="text-xs text-text-muted">
                      {[t.cargo, t.empresa].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={i < t.calificacion ? 'fill-gold text-gold' : 'text-border'} />
                  ))}
                </div>
              </div>

              {/* Texto */}
              <p className="flex-1 text-sm font-light italic leading-relaxed text-text-muted">&quot;{t.texto}&quot;</p>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <p className="text-[10px] text-text-muted">{fmtDate(t.created_at)}</p>
                <div className="flex gap-1.5">
                  {t.estado !== 'aprobado' && (
                    <button onClick={() => changeEstado(t.id, 'aprobado')} disabled={updating === t.id} title="Aprobar"
                      className="rounded border border-emerald-500/40 p-1.5 text-emerald-400 transition-colors hover:bg-emerald-500/10 disabled:opacity-40">
                      <CheckCircle size={14} />
                    </button>
                  )}
                  {t.estado !== 'rechazado' && (
                    <button onClick={() => changeEstado(t.id, 'rechazado')} disabled={updating === t.id} title="Rechazar"
                      className="rounded border border-red-500/40 p-1.5 text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-40">
                      <XCircle size={14} />
                    </button>
                  )}
                  <button onClick={() => deleteTestimonio(t.id)} disabled={updating === t.id} title="Eliminar"
                    className="rounded border border-border p-1.5 text-text-muted transition-colors hover:border-red-500 hover:text-red-400 disabled:opacity-40">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
