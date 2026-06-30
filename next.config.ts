import type { NextConfig } from 'next'

const securityHeaders = [
  // Evita que el sitio sea embebido en iframes externos (clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Evita que el navegador infiera el MIME type incorrecto
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Controla la información de Referer enviada a terceros
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Deshabilita funcionalidades de browser no necesarias
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // Fuerza HTTPS por 1 año (solo efectivo en producción con HTTPS)
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
]

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
