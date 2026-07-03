'use client'

import { useState } from 'react'

export type Consulta = {
  id: string
  nombre: string
  correo: string
  telefono: string
  tipo_consulta: string
  mensaje: string
  confidencial: boolean
  estado: string
  created_at: string
}

const ESTADO_STYLES: Record<string, string> = {
  nuevo:      'border-sky-500/50 bg-sky-500/10 text-sky-400',
  leido:      'border-yellow-500/50 bg-yellow-500/10 text-yellow-400',
  respondido: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
  archivado:  'border-zinc-500/50 bg-zinc-500/10 text-zinc-400',
}

const TIPO_LABEL: Record<string, string> = {
  personal: 'Personal', empresarial: 'Empresarial',
  funcionario: 'Funcionario', urgencia: 'Urgencia', otro: 'Otro',
}

const ESTADOS = ['nuevo', 'leido', 'respondido', 'archivado']

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('es-EC', {
    timeZone: 'America/Guayaquil', dateStyle: 'short', timeStyle: 'short',
  })
}

export default function ConsultasAdmin({ consultas: initial }: { consultas: Consulta[] }) {
  const [prevInitial, setPrevInitial] = useState(initial)
  const [consultas, setConsultas] = useState(initial)
  const [updating, setUpdating]   = useState<string | null>(null)
  const [expanded, setExpanded]   = useState<string | null>(null)
  const [filter, setFilter]       = useState<string>('todos')

  // Refresca la lista si el servidor manda datos nuevos, sin perder el filtro activo.
  if (initial !== prevInitial) {
    setPrevInitial(initial)
    setConsultas(initial)
  }

  async function changeEstado(id: string, estado: string) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/admin/consultas/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado }),
      })
      if (res.ok) setConsultas((prev) => prev.map((c) => c.id === id ? { ...c, estado } : c))
    } finally { setUpdating(null) }
  }

  const visible = filter === 'todos' ? consultas : consultas.filter((c) => c.estado === filter)
  const counts  = Object.fromEntries(['todos', ...ESTADOS].map((e) => [e, e === 'todos' ? consultas.length : consultas.filter((c) => c.estado === e).length]))

  return (
    <div>
      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-2">
        {(['todos', ...ESTADOS] as const).map((f) => (
          <button type="button" key={f} onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 font-montserrat text-xs uppercase tracking-widest transition-colors ${filter === f ? 'border-gold bg-gold text-primary' : 'border-gold/30 text-gold/70 hover:border-gold hover:text-gold'}`}>
            {f === 'todos' ? 'Todos' : f} ({counts[f]})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-text-muted">No hay consultas {filter !== 'todos' ? `con estado "${filter}"` : ''}.</p>
      ) : (
        <div className="space-y-2">
          {visible.map((c) => (
            <div key={c.id} className="border border-border bg-card-bg">
              {/* Header row */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${ESTADO_STYLES[c.estado] ?? ''}`}>{c.estado}</span>
                    {c.confidencial && <span className="rounded-full border border-purple-500/40 bg-purple-500/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-purple-400">Confidencial</span>}
                    <span className="text-[10px] uppercase tracking-widest text-gold/60">{TIPO_LABEL[c.tipo_consulta] ?? c.tipo_consulta}</span>
                  </div>
                  <p className="mt-1.5 font-cinzel text-sm font-semibold text-text-light">{c.nombre}</p>
                  <p className="text-xs text-text-muted">
                    <a href={`mailto:${c.correo}`} className="hover:text-gold">{c.correo}</a>
                    {' · '}<a href={`tel:${c.telefono}`} className="hover:text-gold">{c.telefono}</a>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-xs text-text-muted">{fmtDate(c.created_at)}</p>
                  <div className="flex gap-1.5">
                    <button type="button" onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                      className="border border-gold/30 px-3 py-1 text-[10px] uppercase tracking-widest text-gold/70 hover:border-gold hover:text-gold">
                      {expanded === c.id ? 'Ocultar' : 'Ver mensaje'}
                    </button>
                    {ESTADOS.filter((e) => e !== c.estado).map((e) => (
                      <button type="button" key={e} onClick={() => changeEstado(c.id, e)} disabled={updating === c.id}
                        className={`rounded border px-3 py-1 text-[10px] uppercase tracking-widest disabled:opacity-40 ${ESTADO_STYLES[e]} hover:opacity-80`}>
                        {updating === c.id ? '…' : e}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Mensaje expandible */}
              {expanded === c.id && (
                <div className="border-t border-border bg-primary/40 px-4 py-3">
                  <p className="whitespace-pre-wrap text-sm font-light leading-relaxed text-text-muted">{c.mensaje}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
