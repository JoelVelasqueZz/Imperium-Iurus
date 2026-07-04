self.addEventListener('push', (event) => {
  if (!event.data) return

  let payload
  try {
    payload = event.data.json()
  } catch {
    return
  }

  const { title, body, url } = payload

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/logo-imperium.png',
      badge: '/logo-imperium.png',
      data: { url },
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url ?? '/admin/agenda'

  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      const existing = allClients.find((c) => new URL(c.url).pathname === new URL(url, self.location.origin).pathname)
      if (existing) {
        await existing.focus()
      } else {
        await self.clients.openWindow(url)
      }
    })(),
  )
})
