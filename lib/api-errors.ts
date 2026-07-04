import { NextResponse } from 'next/server'

/** PostgrestError y StorageError no comparten paquete, pero ambos extienden Error: basta con `message`. */
type SupabaseErrorLike = Pick<Error, 'message'>

/** Loguea el error real de Supabase (query o storage) server-side y responde con un mensaje genérico al cliente. */
export function supabaseErrorResponse(
  context: string,
  error: SupabaseErrorLike,
  message: string,
  status = 502,
) {
  console.error(`[${context}] Supabase error:`, error)
  return NextResponse.json({ error: message }, { status })
}
