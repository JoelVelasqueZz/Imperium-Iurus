'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { ArrowLeft, Send } from 'lucide-react'
import { enviarMensajeAdmin } from './actions'

type Mensaje = {
  id: string
  cliente_id: string
  remitente: 'cliente' | 'abogado'
  texto: string
  created_at: string
  leido: boolean
}

type Cliente = {
  id: string
  email: string
  nombre: string | null
  avatar: string | null
}

type Props = {
  clienteId: string
  cliente: Cliente
  mensajesIniciales: Mensaje[]
}

export default function ChatAdmin({ clienteId, cliente, mensajesIniciales }: Props) {
  const supabase  = createSupabaseBrowserClient()
  const bottomRef = useRef<HTMLDivElement>(null)

  const [prevClienteId, setPrevClienteId] = useState(clienteId)
  const [mensajes, setMensajes] = useState<Mensaje[]>(mensajesIniciales)
  const [texto,    setTexto]    = useState('')
  const [pending,  startTransition] = useTransition()

  // Si el admin navega de un chat a otro sin recargar la página, React reutiliza
  // esta misma instancia — sin este chequeo, los mensajes del cliente anterior
  // quedarían visibles bajo el nombre del nuevo cliente.
  if (clienteId !== prevClienteId) {
    setPrevClienteId(clienteId)
    setMensajes(mensajesIniciales)
    setTexto('')
  }

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  // Realtime — el SELECT policy permite al admin ver todos los mensajes
  useEffect(() => {
    const channel = supabase
      .channel(`chat-admin:${clienteId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'mensajes', filter: `cliente_id=eq.${clienteId}` },
        (payload) => {
          setMensajes(prev => {
            if (prev.find(m => m.id === (payload.new as Mensaje).id)) return prev
            return [...prev, payload.new as Mensaje]
          })
        },
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [clienteId, supabase])

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    const t = texto.trim()
    if (!t || pending) return
    setTexto('')
    startTransition(async () => {
      await enviarMensajeAdmin(clienteId, t)
    })
  }

  const nombreCliente = cliente.nombre ?? cliente.email

  return (
    <>
      {/* Header */}
      <header className="flex shrink-0 items-center gap-4 border-b border-border bg-[#060b12] px-5 py-3">
        <Link
          href="/admin/chats"
          className="flex items-center gap-1.5 font-montserrat text-[10px] uppercase tracking-widest text-text-muted transition-colors hover:text-gold"
        >
          <ArrowLeft size={12} />
          Volver
        </Link>

        <div className="h-5 w-px bg-border" />

        <div className="flex items-center gap-3">
          {cliente.avatar ? (
            <Image src={cliente.avatar} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white/5 font-montserrat text-xs text-text-muted">
              {(cliente.nombre ?? cliente.email).charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-montserrat text-sm font-semibold text-text-light">{nombreCliente}</p>
            {cliente.nombre && (
              <p className="font-montserrat text-[10px] text-text-muted/60">{cliente.email}</p>
            )}
          </div>
        </div>
      </header>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-3">
          {mensajes.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-montserrat text-sm text-text-muted">
                No hay mensajes aún con {nombreCliente}.
              </p>
              <p className="mt-1 font-montserrat text-xs text-text-muted/50">
                Puede iniciar la conversación enviando un mensaje.
              </p>
            </div>
          )}

          {mensajes.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.remitente === 'abogado' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[78%] rounded px-4 py-2.5 ${
                  m.remitente === 'abogado'
                    ? 'bg-gold/15 text-text-light'
                    : 'border border-border bg-card-bg text-text-light'
                }`}
              >
                {m.remitente === 'cliente' && (
                  <p className="mb-1 font-cinzel text-[9px] uppercase tracking-widest text-text-muted/70">
                    {nombreCliente}
                  </p>
                )}
                <p className="font-montserrat text-sm leading-relaxed">{m.texto}</p>
                <p className="mt-1 text-right font-montserrat text-[9px] text-text-muted/50">
                  {new Date(m.created_at).toLocaleTimeString('es-EC', {
                    hour:     '2-digit',
                    minute:   '2-digit',
                    timeZone: 'America/Guayaquil',
                  })}
                  {m.remitente === 'abogado' && (
                    <span className="ml-2 text-gold/50">{m.leido ? '✓✓' : '✓'}</span>
                  )}
                </p>
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={enviar}
        className="shrink-0 border-t border-border bg-[#060b12] px-4 py-3"
      >
        <div className="mx-auto flex max-w-2xl gap-3">
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={`Responder a ${nombreCliente}…`}
            aria-label={`Responder a ${nombreCliente}`}
            disabled={pending}
            className="flex-1 border border-border bg-card-bg px-4 py-2.5 font-montserrat text-sm text-text-light placeholder-text-muted/40 outline-none transition-colors focus:border-gold disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!texto.trim() || pending}
            className="flex shrink-0 items-center gap-2 border border-gold bg-gold px-4 py-2.5 font-montserrat text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-gold/90 disabled:opacity-50"
          >
            <Send size={14} />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </div>
      </form>
    </>
  )
}
