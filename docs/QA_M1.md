<!--
IMPERIUM IURIS — T08 Responsividad y pruebas cross-browser M1
Módulo: M1 — Sitio Web Público
RF: RNF-11, RNF-14
Desarrollado: 2026-05-19
-->

# QA M1

## Breakpoints a verificar

- [ ] Mobile: 375px
- [ ] Mobile: 390px (iPhone 14)
- [ ] Mobile: 430px
- [ ] Tablet: 768px (iPad)
- [ ] Tablet: 1024px (iPad Pro)
- [ ] Desktop: 1280px
- [ ] Desktop: 1440px
- [ ] Desktop: 1920px

## Navegadores

- [ ] Chrome 120+
- [ ] Firefox 121+
- [ ] Safari 17+ (macOS/iOS)
- [ ] Edge 120+

## Elementos críticos

- [ ] HeroSection: H1 legible en mobile, CTAs en columna.
- [ ] Navbar: menú hamburguesa funcional, logo visible.
- [ ] TrustBlock: grid responsivo sin desbordamiento.
- [ ] ServicesBlock: accordion funciona en touch.
- [ ] UrgencyBlock: botón de atención inmediata visible y grande en mobile.
- [ ] BlogPreview: tarjetas apiladas en mobile.
- [ ] ContactForm: inputs accesibles en teclado virtual.
- [ ] Footer: links accesibles, sin apilamiento incorrecto.

## Accesibilidad

- [ ] Contraste texto/fondo >= 4.5:1.
- [ ] Alt text en todas las imágenes informativas.
- [ ] Focus visible en todos los elementos interactivos.
- [ ] Aria-labels en iconos sin texto.

## Performance

- [ ] next/image para imágenes principales.
- [ ] Fuentes locales con display: swap.
- [ ] Sin console.error ni console.warn en producción.
- [ ] Lighthouse score >= 85 en Performance, Accessibility y SEO.

## Estado de implementación

- [x] Estructura App Router creada.
- [x] Fuentes locales copiadas y cargadas con `next/font/local`.
- [x] Paleta y tipografías registradas en Tailwind.
- [x] HOME implementado con secciones T02-T06.
- [x] Nosotros implementado con secciones institucionales.
- [x] Blog listado/artículo implementado con datos estáticos.
- [x] Contacto implementado con React Hook Form + Zod.
- [x] Botón flotante WhatsApp placeholder preparado para T09.
