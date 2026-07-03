import { useState } from 'react'

export type SaveState = 'idle' | 'saving' | 'saved' | 'error'

async function saveSection(clave: string, valor: unknown): Promise<boolean> {
  const res = await fetch('/api/admin/configuracion', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clave, valor }),
  })
  return res.ok
}

export function useSave(clave: string) {
  const [state, setState] = useState<SaveState>('idle')

  async function save(valor: unknown) {
    setState('saving')
    const ok = await saveSection(clave, valor).catch(() => false)
    setState(ok ? 'saved' : 'error')
    if (ok) setTimeout(() => setState('idle'), 3000)
    return ok
  }

  return { state, save }
}
