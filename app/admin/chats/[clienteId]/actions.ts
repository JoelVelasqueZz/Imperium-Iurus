'use server'

import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-auth'

export async function enviarMensajeAdmin(clienteId: string, texto: string) {
  const user = await getUser()
  if (!isAdminUser(user)) throw new Error('No autorizado')

  const { error } = await supabase.from('mensajes').insert({
    cliente_id: clienteId,
    remitente:  'abogado',
    texto:      texto.trim(),
  })

  if (error) throw new Error(error.message)
}
