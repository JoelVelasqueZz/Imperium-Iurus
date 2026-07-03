'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { CalendarDays, LayoutDashboard, LogOut, MessageCircle, PencilLine, Shield, User } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { useEditMode } from '@/components/providers/EditModeProvider'

export default function NavAuthButton({ mobile = false }: { mobile?: boolean }) {
  const router      = useRouter()
  const supabase    = createSupabaseBrowserClient()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isAdmin, editMode, toggleEditMode } = useEditMode()

  // undefined = cargando | null = no logueado | User = logueado
  const [user, setUser] = useState<SupabaseUser | null | undefined>(undefined)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user ?? null))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  useEffect(() => {
    if (!open) return
    function onOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [open])

  async function cerrarSesion() {
    setOpen(false)
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // Sin renderizar nada mientras carga para evitar layout shift
  if (user === undefined) return null

  // ── No logueado ────────────────────────────────────────────────
  if (!user) {
    if (mobile) {
      return (
        <Link
          href="/login"
          className="focus-gold border-b border-border/50 py-4 font-cinzel text-sm font-medium uppercase tracking-widest text-gold/70 transition-colors hover:text-gold"
        >
          Iniciar sesión
        </Link>
      )
    }
    return (
      <Link
        href="/login"
        className="focus-gold relative font-cinzel text-[11px] font-medium uppercase tracking-[0.2em] text-gold/60 transition-colors duration-200 hover:text-gold"
      >
        Iniciar sesión
      </Link>
    )
  }

  // ── Logueado ───────────────────────────────────────────────────
  const firstName = ((user.user_metadata?.full_name as string) ?? '').split(' ')[0]
                 || user.email?.split('@')[0]
                 || 'Mi cuenta'
  const avatar = user.user_metadata?.avatar_url as string | undefined
  const isGoogleUser = user.app_metadata?.provider === 'google' || user.app_metadata?.providers?.includes('google')

  if (mobile) {
    return (
      <div className="border-b border-border/50 py-4">
        <div className="mb-3 flex items-center gap-3">
          {avatar ? (
            <Image src={avatar} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
              <User size={14} className="text-gold" />
            </div>
          )}
          <span className="font-montserrat text-sm text-gold/90">{firstName}</span>
        </div>
        <div className="flex flex-col gap-3">
          {!isAdmin && (
            <Link
              href="/chat"
              className="flex items-center gap-2 font-montserrat text-xs font-medium uppercase tracking-widest text-gold transition-colors hover:text-gold/80"
            >
              <MessageCircle size={14} />
              Chat con su abogado
            </Link>
          )}
          <Link
            href="/mis-citas"
            className="flex items-center gap-2 font-montserrat text-xs font-medium uppercase tracking-widest text-gold/80 transition-colors hover:text-gold"
          >
            <CalendarDays size={14} />
            Mis citas
          </Link>
          {!isAdmin && !isGoogleUser && (
            <Link
              href="/cuenta/seguridad"
              className="flex items-center gap-2 font-montserrat text-xs font-medium uppercase tracking-widest text-gold/80 transition-colors hover:text-gold"
            >
              <Shield size={14} />
              Seguridad (2FA)
            </Link>
          )}
          {isAdmin && (
            <>
              <Link
                href="/admin/agenda"
                className="flex items-center gap-2 font-montserrat text-xs font-medium uppercase tracking-widest text-gold/80 transition-colors hover:text-gold"
              >
                <LayoutDashboard size={14} />
                Panel Admin
              </Link>
              <button
                type="button"
                onClick={toggleEditMode}
                className="flex items-center gap-2 font-montserrat text-xs font-medium uppercase tracking-widest text-gold/80 transition-colors hover:text-gold"
              >
                <PencilLine size={14} />
                Modo Edición {editMode ? '(activo)' : ''}
              </button>
            </>
          )}
          <button
            type="button"
            onClick={cerrarSesion}
            className="flex items-center gap-2 font-montserrat text-xs uppercase tracking-widest text-text-muted/70 transition-colors hover:text-red-400"
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="focus-gold flex items-center gap-2 rounded-full border border-gold/30 py-1 pl-1 pr-3 transition-colors hover:border-gold/60 hover:bg-gold/5"
      >
        {avatar ? (
          <Image src={avatar} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <User size={13} className="text-gold" />
          </div>
        )}
        <span className="font-montserrat text-[11px] font-medium tracking-widest text-gold/90">
          {firstName}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-56 border border-border bg-[#0F1115] py-1 shadow-lg shadow-black/50"
        >
          {!isAdmin && (
            <Link
              href="/chat"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 font-montserrat text-xs uppercase tracking-widest text-gold/90 transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <MessageCircle size={14} />
              Chat con su abogado
            </Link>
          )}
          <Link
            href="/mis-citas"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 font-montserrat text-xs uppercase tracking-widest text-gold/70 transition-colors hover:bg-gold/10 hover:text-gold"
          >
            <CalendarDays size={14} />
            Mis citas
          </Link>
          {!isAdmin && !isGoogleUser && (
            <Link
              href="/cuenta/seguridad"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 font-montserrat text-xs uppercase tracking-widest text-gold/70 transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <Shield size={14} />
              Seguridad (2FA)
            </Link>
          )}
          {isAdmin && (
            <>
              <div className="mx-3 border-t border-border/60" />
              <Link
                href="/admin/agenda"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 font-montserrat text-xs uppercase tracking-widest text-gold/90 transition-colors hover:bg-gold/10 hover:text-gold"
              >
                <LayoutDashboard size={14} />
                Panel Admin
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={() => { toggleEditMode(); setOpen(false) }}
                className="flex w-full items-center gap-3 px-4 py-3 font-montserrat text-xs uppercase tracking-widest text-gold/70 transition-colors hover:bg-gold/10 hover:text-gold"
              >
                <PencilLine size={14} />
                Modo Edición {editMode ? '(activo)' : ''}
              </button>
            </>
          )}
          <div className="mx-3 border-t border-border/60" />
          <button
            type="button"
            role="menuitem"
            onClick={cerrarSesion}
            className="flex w-full items-center gap-3 px-4 py-3 font-montserrat text-xs uppercase tracking-widest text-text-muted transition-colors hover:bg-red-950/30 hover:text-red-400"
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
