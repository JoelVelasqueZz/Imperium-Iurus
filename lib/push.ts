import webpush from 'web-push'
import { supabase } from '@/lib/supabase'

const vapidPublic  = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
const vapidPrivate = process.env.VAPID_PRIVATE_KEY
const vapidSubject = process.env.VAPID_SUBJECT

if (vapidPublic && vapidPrivate && vapidSubject) {
  webpush.setVapidDetails(vapidSubject, vapidPublic, vapidPrivate)
}

type PushPayload = {
  title: string
  body: string
  url: string
}

/**
 * Manda una notificación push a todas las suscripciones guardadas del admin.
 * Nunca lanza — un fallo al notificar no debe romper el flujo principal
 * (guardar el mensaje/consulta/cita siempre debe funcionar).
 */
export async function sendPushToAdmin(payload: PushPayload): Promise<void> {
  if (!vapidPublic || !vapidPrivate || !vapidSubject) return

  try {
    const { data: subs, error } = await supabase.from('push_subscriptions').select('*')
    if (error || !subs?.length) return

    await Promise.allSettled(
      subs.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            JSON.stringify(payload),
          )
        } catch (err) {
          const statusCode = (err as { statusCode?: number }).statusCode
          // 404/410 = la suscripción ya no existe en el navegador — se limpia
          if (statusCode === 404 || statusCode === 410) {
            await supabase.from('push_subscriptions').delete().eq('id', sub.id)
          } else {
            console.error('[push] Error enviando notificación:', err)
          }
        }
      }),
    )
  } catch (err) {
    console.error('[push] Error inesperado:', err)
  }
}
