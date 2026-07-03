'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { ArrowLeft, LogOut, Send } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

type Mensaje = {
  id: string
  cliente_id: string
  remitente: 'cliente' | 'abogado'
  texto: string
  created_at: string
  leido: boolean
}

export default function ChatClientePage() {
  const router   = useRouter()
  const supabase = createSupabaseBrowserClient()

  const [user,     setUser]     = useState<User | null>(null)
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [texto,    setTexto]    = useState('')
  const [enviando, setEnviando] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  const marcarLeidos = useCallback(async (uid: string) => {
    await supabase
      .from('mensajes')
      .update({ leido: true })
      .eq('cliente_id', uid)
      .eq('remitente', 'abogado')
      .eq('leido', false)
  }, [supabase])

  useEffect(() => {
    // canal guardado en variable local para el cleanup correcto
    let channel: ReturnType<typeof supabase.channel> | null = null

    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      console.log('[chat] getUser:', user?.id ?? 'NO SESSION')

      if (!user) { router.push('/login'); return }
      setUser(user)

      // ── Carga inicial ───────────────────────────────────────
      const { data, error: loadError } = await supabase
        .from('mensajes')
        .select('*')
        .eq('cliente_id', user.id)
        .order('created_at', { ascending: true })

      console.log('[chat] carga inicial:', { count: data?.length, error: loadError })
      setMensajes((data ?? []) as Mensaje[])
      if (data?.length) marcarLeidos(user.id)

      // ── Realtime ────────────────────────────────────────────
      channel = supabase
        .channel(`chat-cliente:${user.id}`)
        .on(
          'postgres_changes',
          {
            event:  'INSERT',
            schema: 'public',
            table:  'mensajes',
            filter: `cliente_id=eq.${user.id}`,
          },
          (payload) => {
            console.log('[chat] realtime INSERT recibido:', payload.new)
            setMensajes(prev => {
              if (prev.find(m => m.id === (payload.new as Mensaje).id)) return prev
              return [...prev, payload.new as Mensaje]
            })
            if ((payload.new as Mensaje).remitente === 'abogado') marcarLeidos(user.id)
          },
        )
        .subscribe((status, err) => {
          console.log('[chat] canal status:', status, err ?? '')
        })
    }

    init()

    // cleanup correcto: React lo llama al desmontar o antes de re-ejecutar el efecto
    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [router, supabase, marcarLeidos])

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    const t = texto.trim()
    console.log('[chat] enviar:', { texto: t, userId: user?.id, enviando })
    if (!t || !user || enviando) return

    setEnviando(true)
    setTexto('')

    const { data, error } = await supabase
      .from('mensajes')
      .insert({ cliente_id: user.id, remitente: 'cliente', texto: t })
      .select()
      .single()

    console.log('[chat] insert resultado:', { data, error })
    setEnviando(false)
  }

  async function cerrarSesion() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const nombre = (user?.user_metadata?.full_name as string) ?? user?.email ?? 'Cliente'

  return (
    <div className="flex h-screen flex-col bg-primary">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-border bg-[#060b12] px-5 py-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/50">
            Portal privado
          </p>
          <p className="font-cinzel text-sm font-bold uppercase tracking-widest text-gold">
            Imperium Iuris
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-montserrat text-xs text-text-muted sm:block">{nombre}</span>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 font-montserrat text-[10px] uppercase tracking-widest text-text-muted transition-colors hover:border-gold/40 hover:text-gold"
          >
            <ArrowLeft size={12} />
            <span className="hidden sm:inline">Inicio</span>
          </Link>
          <button
            type="button"
            onClick={cerrarSesion}
            className="flex items-center gap-1.5 rounded border border-border px-3 py-1.5 font-montserrat text-[10px] uppercase tracking-widest text-text-muted transition-colors hover:border-red-500/40 hover:text-red-400"
          >
            <LogOut size={12} />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-3">
          {mensajes.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-cinzel text-sm text-text-muted">Su conversación privada</p>
              <p className="mt-2 font-montserrat text-xs leading-relaxed text-text-muted/50">
                Escriba su mensaje para iniciar la comunicación con el abogado.
                <br />
                Toda conversación es estrictamente confidencial.
              </p>
            </div>
          )}

          {mensajes.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.remitente === 'cliente' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[78%] rounded px-4 py-2.5 ${
                  m.remitente === 'cliente'
                    ? 'bg-gold/15 text-text-light'
                    : 'border border-border bg-card-bg text-text-light'
                }`}
              >
                {m.remitente === 'abogado' && (
                  <p className="mb-1 font-cinzel text-[9px] uppercase tracking-widest text-gold/70">
                    Ing. Fray
                  </p>
                )}
                <p className="font-montserrat text-sm leading-relaxed">{m.texto}</p>
                <p className="mt-1 text-right font-montserrat text-[9px] text-text-muted/50">
                  {new Date(m.created_at).toLocaleTimeString('es-EC', {
                    hour:     '2-digit',
                    minute:   '2-digit',
                    timeZone: 'America/Guayaquil',
                  })}
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
            placeholder="Escriba su mensaje…"
            aria-label="Escriba su mensaje"
            disabled={!user || enviando}
            className="flex-1 border border-border bg-card-bg px-4 py-2.5 font-montserrat text-sm text-text-light placeholder-text-muted/40 outline-none transition-colors focus:border-gold disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!texto.trim() || !user || enviando}
            className="flex shrink-0 items-center gap-2 border border-gold bg-gold px-4 py-2.5 font-montserrat text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-gold/90 disabled:opacity-50"
          >
            <Send size={14} />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </div>
      </form>
    </div>
  )
}
