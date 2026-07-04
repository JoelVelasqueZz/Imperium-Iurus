'use client'

import { useEffect, useState } from 'react'
import { Bell, BellOff, BellRing } from 'lucide-react'

type Status = 'checking' | 'unsupported' | 'off' | 'on' | 'denied'

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const array = new Uint8Array(new ArrayBuffer(rawData.length))
  for (let i = 0; i < rawData.length; i++) {
    array[i] = rawData.charCodeAt(i)
  }
  return array
}

export default function PushNotificationToggle() {
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    async function check() {
      if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
        setStatus('unsupported')
        return
      }
      if (Notification.permission === 'denied') {
        setStatus('denied')
        return
      }
      try {
        const registration = await navigator.serviceWorker.getRegistration()
        const sub = await registration?.pushManager?.getSubscription()
        setStatus(sub ? 'on' : 'off')
      } catch (err) {
        console.error('[push] Error verificando suscripción existente:', err)
        setStatus('off')
      }
    }
    check()
  }, [])

  async function activar() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setStatus('denied')
        return
      }

      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!publicKey) {
        console.error('[push] Falta NEXT_PUBLIC_VAPID_PUBLIC_KEY')
        return
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })

      const res = await fetch('/api/admin/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription.toJSON()),
      })

      if (!res.ok) throw new Error('No se pudo guardar la suscripción')
      setStatus('on')
    } catch (err) {
      console.error('[push] Error activando notificaciones:', err)
    }
  }

  if (status === 'checking' || status === 'unsupported') return null

  if (status === 'on') {
    return (
      <div className="flex items-center gap-3 rounded px-3 py-2.5 font-montserrat text-xs font-medium uppercase tracking-widest text-emerald-400">
        <BellRing size={15} className="shrink-0" />
        Notificaciones activas
      </div>
    )
  }

  if (status === 'denied') {
    return (
      <div className="flex items-center gap-3 rounded px-3 py-2.5 font-montserrat text-[10px] font-medium uppercase tracking-widest text-text-muted/50">
        <BellOff size={15} className="shrink-0" />
        Notificaciones bloqueadas
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={activar}
      className="flex w-full items-center gap-3 rounded px-3 py-2.5 font-montserrat text-xs font-medium uppercase tracking-widest text-text-muted transition-colors hover:bg-white/5 hover:text-gold/80"
    >
      <Bell size={15} className="shrink-0" />
      Activar notificaciones
    </button>
  )
}
