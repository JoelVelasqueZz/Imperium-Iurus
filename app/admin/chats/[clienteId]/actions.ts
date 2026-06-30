'use server'

import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'

export async function enviarMensajeAdmin(clienteId: string, texto: string) {
  const user = await getUser()
  if (!user) throw new Error('No autorizado')

  const adminEmail = process.env.ADMIN_EMAIL
  if (adminEmail && user.email !== adminEmail && user.app_metadata?.role !== 'admin') {
    throw new Error('No autorizado')
  }

  const { error } = await supabase.from('mensajes').insert({
    cliente_id: clienteId,
    remitente:  'abogado',
    texto:      texto.trim(),
  })

  if (error) throw new Error(error.message)
}
