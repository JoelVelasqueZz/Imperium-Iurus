'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CalendarDays, LogOut, MessageCircle, MessageSquare, Newspaper, Star } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const NAV = [
  { href: '/admin/agenda',      label: 'Agenda',      icon: CalendarDays },
  { href: '/admin/contacto',    label: 'Consultas',   icon: MessageSquare },
  { href: '/admin/chats',       label: 'Chats',       icon: MessageCircle },
  { href: '/admin/blog',        label: 'Blog',        icon: Newspaper },
  { href: '/admin/testimonios', label: 'Testimonios', icon: Star },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router   = useRouter()

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r border-border bg-[#060b12]">
      {/* Marca */}
      <div className="border-b border-border px-5 py-5">
        <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/50">Panel</p>
        <p className="mt-0.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold">
          Imperium Iuris
        </p>
      </div>

      {/* Links */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded px-3 py-2.5 font-montserrat text-xs font-medium uppercase tracking-widest transition-colors ${
                active
                  ? 'bg-gold/10 text-gold'
                  : 'text-text-muted hover:bg-white/5 hover:text-gold/80'
              }`}
            >
              <Icon size={15} className="shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded px-3 py-2.5 font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:bg-red-950/40 hover:text-red-400"
        >
          <LogOut size={15} className="shrink-0" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
