import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // ── Rutas admin ────────────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login'
    // Admin = role 'admin' en app_metadata O email coincide con ADMIN_EMAIL
    const isAdmin =
      !!user &&
      (user.app_metadata?.role === 'admin' ||
        (!!process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL))

    if (!isAdmin && !isLoginPage) {
      const url = new URL('/admin/login', request.url)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
    if (isAdmin && isLoginPage) {
      return NextResponse.redirect(new URL('/admin/agenda', request.url))
    }
    return supabaseResponse
  }

  // ── Portal de clientes ─────────────────────────────────────────────────
  if (pathname.startsWith('/chat') || pathname.startsWith('/mis-citas')) {
    if (!user) return NextResponse.redirect(new URL('/login', request.url))
    return supabaseResponse
  }

  if (pathname === '/login') {
    if (user) return NextResponse.redirect(new URL('/', request.url))
    return supabaseResponse
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/chat', '/mis-citas', '/login'],
}
