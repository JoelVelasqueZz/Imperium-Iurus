import { type NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getUser } from '@/lib/supabase-server'
import { isAdminUser } from '@/lib/admin-auth'

const BUCKET = 'site-images'
const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

export async function POST(request: NextRequest) {
  const user = await getUser()
  if (!isAdminUser(user)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const formData = await request.formData().catch(() => null)
  const file = formData?.get('file')
  const carpeta = formData?.get('carpeta')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Archivo faltante' }, { status: 422 })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Formato no permitido. Use JPG, PNG, WEBP o AVIF.' }, { status: 422 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'La imagen supera el límite de 5MB.' }, { status: 422 })
  }

  const ext = file.name.split('.').pop() ?? 'jpg'
  const prefix = typeof carpeta === 'string' && /^[a-z0-9_-]+$/i.test(carpeta) ? `${carpeta}/` : ''
  const path = `${prefix}${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 502 })

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return NextResponse.json({ success: true, url: data.publicUrl })
}
