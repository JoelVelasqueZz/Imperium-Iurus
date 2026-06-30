import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ChatAdmin from './ChatAdmin'

export const dynamic = 'force-dynamic'

type Mensaje = {
  id: string
  cliente_id: string
  remitente: 'cliente' | 'abogado'
  texto: string
  created_at: string
  leido: boolean
}

async function getCliente(clienteId: string) {
  const { data: { user }, error } = await supabase.auth.admin.getUserById(clienteId)
  if (error || !user) return null
  return {
    id:     user.id,
    email:  user.email ?? '',
    nombre: (user.user_metadata?.full_name as string) ?? null,
    avatar: (user.user_metadata?.avatar_url as string) ?? null,
  }
}

async function getMensajes(clienteId: string): Promise<Mensaje[]> {
  // Marcar mensajes del cliente como leídos
  await supabase
    .from('mensajes')
    .update({ leido: true })
    .eq('cliente_id', clienteId)
    .eq('remitente', 'cliente')
    .eq('leido', false)

  const { data } = await supabase
    .from('mensajes')
    .select('*')
    .eq('cliente_id', clienteId)
    .order('created_at', { ascending: true })

  return (data ?? []) as Mensaje[]
}

export default async function AdminChatClientePage({
  params,
}: {
  params: Promise<{ clienteId: string }>
}) {
  const { clienteId } = await params
  const [cliente, mensajes] = await Promise.all([
    getCliente(clienteId),
    getMensajes(clienteId),
  ])

  if (!cliente) notFound()

  return (
    <main className="flex h-screen flex-col bg-primary">
      <ChatAdmin
        clienteId={clienteId}
        cliente={cliente}
        mensajesIniciales={mensajes}
      />
    </main>
  )
}
