// Tipos, defaults y funciones puras — sin imports de Supabase.
// Seguro para importar en client components.

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ContactoConfig = {
  whatsapp: string
  whatsapp_mensaje: string
  telefono: string
  correo: string
  direccion: string
  horas: string
  emergencia: string
}

export type HorarioAtencionConfig = {
  dias: number[]       // índices JS: 0=Dom 1=Lun … 6=Sáb
  hora_inicio: string  // "HH:MM"
  hora_fin: string     // "HH:MM"
  mensaje_fuera: string
}

export type HorarioCitasConfig = {
  dias: number[]
  hora_inicio: string
  hora_fin: string
  intervalo: number
}

export type FestivosConfig = {
  fechas: string[]     // "YYYY-MM-DD"
}

export type HeroConfig = {
  title_before: string
  title_highlight: string
  title_after: string
  subtitle: string
  emotional: string
  cta_primary: string
  cta_urgent: string
  cta_tertiary: string
}

export type RedesSocialesConfig = {
  linkedin: string
  instagram: string
  facebook: string
}

export type AgendaPageConfig = {
  eyebrow: string
  titulo: string
  subtitulo: string
  horario_titulo: string
  horario_texto1: string
  horario_texto2: string
  urgencia_texto: string
  pasos_titulo: string
  pasos: string[]
}

export type ContactoPageConfig = {
  eyebrow: string
  titulo: string
  subtitulo: string
}

export type BlogPageConfig = {
  eyebrow: string
  titulo: string
  subtitulo: string
}

export type BlogPreviewConfig = {
  eyebrow: string
  titulo: string
  subtitulo: string
}

export type FilosofiaPilarConfig = {
  title: string
  text: string
}

export type NosotrosPageConfig = {
  eyebrow: string
  titulo: string
  intro: string
  descripcion: string
  tagline: string
  filosofia_titulo: string
  filosofia_subtitulo: string
  filosofia_closing: string
  pilares: FilosofiaPilarConfig[]
  por_que_texto: string
  vision_titulo: string
  vision: string
  vision_tagline: string
}

export type TrustCardConfig = {
  title: string
  body: string
  sub: string
}

export type TrustBlockConfig = {
  eyebrow: string
  titulo: string
  subtitulo: string
  tarjetas: TrustCardConfig[]
}

export type ServiceItemConfig = {
  title: string
  headline: string
  desc: string
  services: string[]
  impact: string
}

export type ServicesBlockConfig = {
  eyebrow: string
  titulo: string
  subtitulo: string
  items: ServiceItemConfig[]
}

export type DifferentialItemConfig = {
  title: string
  text: string
  impact: string
}

export type DifferentialBlockConfig = {
  eyebrow: string
  titulo: string
  subtitulo: string
  closing: string
  cta: string
  items: DifferentialItemConfig[]
}

export type UrgencyEscenarioConfig = {
  titulo: string
  subtitulo: string
  items: string[]
  boton: string
}

export type UrgencyBlockConfig = {
  eyebrow: string
  titulo: string
  texto_principal: string
  badge: string
  cta: string
  footer: string
  escenarios: UrgencyEscenarioConfig[]
}

export type FinalCtaConfig = {
  titulo: string
  subtitulo: string
  boton: string
  boton_url: string
  boton2: string
  boton2_url: string
}

export type TestimonioItemConfig = {
  texto: string
  autor: string
}

export type TestimonialsBlockConfig = {
  eyebrow: string
  titulo: string
  subtitulo: string
  testimonios: TestimonioItemConfig[]
}

export type FooterConfig = {
  descripcion: string
}

export type PorQueBlockConfig = {
  titulo: string
  subtitulo: string
  items: string[]
  texto: string
  closing: string
}

export type EquipoBlockConfig = {
  titulo: string
  subtitulo: string
  especialistas: string[]
  closing: string
}

export type MetodologiaPasoConfig = {
  titulo: string
  texto: string
}

export type MetodologiaBlockConfig = {
  titulo: string
  subtitulo: string
  pasos: MetodologiaPasoConfig[]
}

export type ConfidencialidadBlockConfig = {
  titulo: string
  subtitulo: string
  items: string[]
  closing: string
}

export type CtaNosotrosConfig = {
  titulo: string
  subtitulo: string
  boton_primary: string
  boton_secondary: string
}

export type ImagenesConfig = {
  hero_carousel: string[]
  servicios: {
    personas: string
    empresas: string
    funcionarios: string
    mediaticos: string
  }
  diferencial_carousel: string[]
  galeria_nosotros: string[]
  galeria_nosotros_eyebrow: string
  galeria_nosotros_titulo: string
}

export type SiteConfig = {
  contacto: ContactoConfig
  horario_atencion: HorarioAtencionConfig
  horario_citas: HorarioCitasConfig
  festivos: FestivosConfig
  hero: HeroConfig
  redes_sociales: RedesSocialesConfig
  agenda_page: AgendaPageConfig
  contacto_page: ContactoPageConfig
  blog_page: BlogPageConfig
  blog_preview: BlogPreviewConfig
  nosotros_page: NosotrosPageConfig
  trust_block: TrustBlockConfig
  services_block: ServicesBlockConfig
  urgency_block: UrgencyBlockConfig
  differential_block: DifferentialBlockConfig
  final_cta: FinalCtaConfig
  testimonials_block: TestimonialsBlockConfig
  footer: FooterConfig
  por_que_block: PorQueBlockConfig
  equipo_block: EquipoBlockConfig
  metodologia_block: MetodologiaBlockConfig
  confidencialidad_block: ConfidencialidadBlockConfig
  cta_nosotros: CtaNosotrosConfig
  imagenes: ImagenesConfig
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const CONFIG_DEFAULTS: SiteConfig = {
  contacto: {
    whatsapp:  '+593 985 222 635',
    whatsapp_mensaje: 'Hola, necesito asistencia legal urgente de IMPERIUM IURIS',
    telefono:  '+593 XX XXX XXXX',
    correo:    'contacto@imperiumiuris.ec',
    direccion: 'Guayaquil, Ecuador',
    horas:     'Lun-Vie 08:00-18:00',
    emergencia:'24/7 para urgencias penales',
  },
  horario_atencion: {
    dias:         [1, 2, 3, 4, 5],
    hora_inicio:  '08:00',
    hora_fin:     '18:00',
    mensaje_fuera:'Estamos fuera de horario, pero para emergencias penales puede contactarnos por WhatsApp',
  },
  horario_citas: {
    dias:        [1, 2, 3, 4, 5],
    hora_inicio: '08:00',
    hora_fin:    '18:00',
    intervalo:   30,
  },
  festivos: { fechas: [] },
  hero: {
    title_before:    'Defensa Penal',
    title_highlight: 'Estratégica',
    title_after:     'de Alto Nivel',
    subtitle:        'Protegemos tu libertad, patrimonio, reputación y futuro mediante estrategias jurídicas multidisciplinarias diseñadas para casos complejos.',
    emotional:       'Cada minuto importa cuando tu libertad está en riesgo.',
    cta_primary:     'Solicitar consulta confidencial',
    cta_urgent:      'Atención inmediata 24/7',
    cta_tertiary:    'Agendar cita',
  },
  redes_sociales: { linkedin: '', instagram: '', facebook: '' },
  agenda_page: {
    eyebrow:   'Agenda tu cita',
    titulo:    'Reserva una consulta confidencial',
    subtitulo: 'Selecciona fecha y horario disponible. Te confirmaremos por correo a la brevedad.',
    horario_titulo: 'Horario de atención',
    horario_texto1: 'Lunes a viernes, 08:00 – 18:00',
    horario_texto2: 'Citas de 30 minutos',
    urgencia_texto: 'Para urgencias penales fuera de horario, contáctenos directamente por WhatsApp. Respondemos las 24 horas.',
    pasos_titulo: '¿Qué esperar?',
    pasos: [
      'Confirme su cita con este formulario.',
      'Recibirá un correo de confirmación.',
      'Nuestro equipo lo contactará para preparar la sesión.',
      'Consulta inicial confidencial y estratégica.',
    ],
  },
  contacto_page: {
    eyebrow:   'Contacto',
    titulo:    'Consulta confidencial',
    subtitulo: 'Comparta la información esencial de su caso para activar una evaluación jurídica inicial.',
  },
  blog_page: {
    eyebrow:   'Blog',
    titulo:    'Contenido jurídico de autoridad',
    subtitulo: 'Guías prácticas para decisiones urgentes, empresariales y reputacionales.',
  },
  blog_preview: {
    eyebrow:   'Contenido de autoridad',
    titulo:    'Blog jurídico premium',
    subtitulo: 'Criterios prácticos para actuar a tiempo frente a riesgos penales.',
  },
  nosotros_page: {
    eyebrow:   'Nosotros',
    titulo: 'Defensa penal estratégica para escenarios complejos',
    intro:
      'Protegemos la libertad, el patrimonio, la reputación y la continuidad empresarial de nuestros clientes frente a investigaciones penales, riesgos regulatorios y crisis jurídicas de alta complejidad.',
    descripcion:
      'IMPERIUM IURIS es una firma jurídica multidisciplinaria con sede en Guayaquil y cobertura nacional, especializada en derecho penal estratégico, penal económico, criminalidad empresarial, delitos contra la administración pública y defensa en investigaciones complejas.',
    tagline:
      'Nuestra práctica combina litigación técnica, análisis preventivo y respuesta inmediata para personas, empresas, directivos y funcionarios públicos.',
    filosofia_titulo: 'Nuestra Filosofía',
    filosofia_subtitulo: 'Cuatro principios sostienen cada decisión jurídica de la firma.',
    filosofia_closing: 'No reaccionamos al problema. Lo anticipamos y lo controlamos.',
    pilares: [
      { title: 'Prevención',       text: 'Anticipamos riesgos antes de que escalen.' },
      { title: 'Estrategia',       text: 'Cada caso requiere una ruta legal diseñada a medida.' },
      { title: 'Confidencialidad', text: 'Protegemos información sensible con absoluta reserva.' },
      { title: 'Resultados',       text: 'Nos enfocamos en soluciones concretas y sostenibles.' },
    ],
    por_que_texto:
      'IMPERIUM IURIS nace para intervenir con precisión técnica antes de que una crisis jurídica genere daños irreversibles.',
    vision_titulo: 'Construimos una nueva generación de defensa penal en Ecuador',
    vision:
      'Aspiramos a convertirnos en la firma penal estratégica más confiable, sofisticada e innovadora del país, integrando excelencia jurídica, tecnología y protección integral.',
    vision_tagline: 'Defensa penal de nivel internacional adaptada a Ecuador.',
  },
  trust_block: {
    eyebrow: 'Confianza inmediata',
    titulo: 'Solidez, confidencialidad y capacidad real',
    subtitulo: 'Una estructura jurídica diseñada para intervenir en escenarios donde la improvisación no es una opción.',
    tarjetas: [
      { title: '+15 años de experiencia en litigación penal estratégica', body: 'Defendemos personas, empresarios, compañías y funcionarios frente a investigaciones penales complejas.', sub: 'Experiencia en delitos económicos, patrimoniales, corporativos y criminalidad organizada.' },
      { title: 'Casos complejos de alto impacto jurídico y patrimonial', body: 'Lavado de activos · Corrupción · Fraude · Delitos financieros · Criminalidad organizada · Delitos societarios', sub: 'Diseñamos estrategias donde otros solo reaccionan.' },
      { title: 'Reserva total en asuntos sensibles', body: 'Protegemos la información, reputación y seguridad de nuestros clientes mediante protocolos estrictos.', sub: 'Discreción absoluta antes, durante y después del proceso.' },
      { title: 'Sede en Guayaquil | Cobertura en todo Ecuador', body: 'Guayaquil · Quito · Cuenca · Manta · Machala · Santo Domingo · Ambato · y más jurisdicciones.', sub: 'Respuesta jurídica inmediata donde el cliente lo necesite.' },
      { title: 'Defensa respaldada por especialistas multidisciplinarios', body: 'Penalistas · Constitucionalistas · Tributaristas · Criminalistas · Auditores forenses · Analistas financieros', sub: 'Cada caso requiere más que abogados.' },
      { title: 'Prevención legal + defensa inmediata', body: 'Compliance penal · Investigaciones internas · Prevención corporativa · Defensa procesal · Litigación penal', sub: 'Prevención inteligente. Defensa contundente.' },
    ],
  },
  services_block: {
    eyebrow: 'Áreas de práctica',
    titulo: '¿En qué podemos ayudarte?',
    subtitulo: 'Identifique rápidamente el tipo de riesgo y active una respuesta jurídica proporcional a la amenaza.',
    items: [
      {
        title: 'Personas Naturales',
        headline: 'Protección inmediata cuando tu libertad está en riesgo',
        desc: 'Defendemos a personas que enfrentan investigaciones, detenciones o procesos penales.',
        services: ['Detenciones en flagrancia', 'Audiencias de formulación de cargos', 'Prisión preventiva', 'Habeas corpus', 'Recursos constitucionales', 'Delitos patrimoniales', 'Delitos informáticos', 'Medidas cautelares'],
        impact: 'Actuamos desde el primer minuto para proteger tus derechos.',
      },
      {
        title: 'Empresas',
        headline: 'Protección penal corporativa y empresarial',
        desc: 'Asesoramos empresas y directivos frente a riesgos penales de operaciones financieras.',
        services: ['Compliance penal corporativo', 'Investigaciones internas', 'Fraude corporativo', 'Lavado de activos', 'Delitos tributarios', 'Riesgos societarios', 'Delitos aduaneros', 'Protección de directivos'],
        impact: 'Prevenimos crisis penales antes de que destruyan empresas.',
      },
      {
        title: 'Funcionarios Públicos',
        headline: 'Defensa técnica frente a investigaciones estatales',
        desc: 'Defendemos a funcionarios y exfuncionarios frente a investigaciones de administración pública.',
        services: ['Peculado', 'Concusión', 'Cohecho', 'Enriquecimiento ilícito', 'Tráfico de influencias', 'Contratación pública', 'Defensa ante Contraloría', 'Defensa ante Fiscalía'],
        impact: 'Defensa estratégica frente al poder punitivo del Estado.',
      },
      {
        title: 'Casos de Alta Exposición Mediática',
        headline: 'Protección legal y reputacional en crisis públicas',
        desc: 'Intervenimos en casos donde el riesgo jurídico viene con presión mediática y daño reputacional.',
        services: ['Gestión de crisis reputacional', 'Estrategia legal frente a medios', 'Casos de alta visibilidad pública', 'Protección de imagen corporativa', 'Comunicación estratégica', 'Manejo preventivo de crisis'],
        impact: 'Defendemos tu caso y protegemos tu reputación.',
      },
    ],
  },
  urgency_block: {
    eyebrow: 'Intervención inmediata',
    titulo: '¿Enfrenta una situación penal urgente?',
    texto_principal:
      'Actuamos de manera inmediata cuando su libertad, patrimonio, empresa o reputación están en riesgo.',
    badge: 'Atención confidencial. Respuesta estratégica. Intervención inmediata.',
    cta: 'Hablar con abogado ahora',
    footer: 'Respuesta confidencial | Atención inmediata | Cobertura nacional',
    escenarios: [
      {
        titulo: '¿Fuiste detenido?',
        subtitulo: 'Defensa inmediata desde el primer minuto',
        items: ['Detenciones en flagrancia', 'Órdenes de captura', 'Audiencias', 'Prisión preventiva', 'Allanamientos', 'Habeas corpus', 'Cautelares'],
        boton: 'Necesito defensa inmediata',
      },
      {
        titulo: '¿Recibiste una notificación fiscal?',
        subtitulo: 'Defensa frente a investigaciones financieras y patrimoniales',
        items: ['Fiscalía', 'UAFE', 'SRI', 'Contraloría', 'Superintendencias', 'Lavado de activos', 'Delitos financieros'],
        boton: 'Solicitar análisis confidencial',
      },
      {
        titulo: '¿Tu empresa está siendo investigada?',
        subtitulo: 'Protección penal corporativa y continuidad empresarial',
        items: ['Compliance', 'Fraude interno', 'Delitos societarios', 'Lavado', 'Aduaneros', 'Directivos', 'Investigaciones internas'],
        boton: 'Hablar con un especialista corporativo',
      },
    ],
  },
  differential_block: {
    eyebrow: 'No somos un despacho penal tradicional',
    titulo: '¿Por qué IMPERIUM IURIS es diferente?',
    subtitulo: 'Combinamos defensa penal estratégica, inteligencia jurídica y protección integral para casos de alta complejidad.',
    closing: 'Casos complejos requieren estructuras superiores',
    cta: 'Solicitar evaluación confidencial',
    items: [
      { title: 'Diagnóstico Estratégico Inmediato', text: 'Analizamos riesgo penal, exposición patrimonial, impacto empresarial y consecuencias reputacionales.', impact: 'Cada minuto sin estrategia aumenta el riesgo.' },
      { title: 'Defensa Multidisciplinaria', text: 'Integramos penal, constitucional, compliance, auditoría forense, criminalística y análisis financiero.', impact: 'Casos complejos requieren múltiples especialistas.' },
      { title: 'Máxima Confidencialidad', text: 'Aplicamos protocolos para proteger información sensible, documentos, patrimonio y privacidad.', impact: 'Su caso permanece donde debe estar: protegido.' },
      { title: 'Litigación de Alto Impacto', text: 'Representamos casos de lavado de activos, delincuencia organizada, fraude y delitos financieros.', impact: 'Defendemos donde las consecuencias son más severas.' },
      { title: 'Protección Reputacional', text: 'Trabajamos estrategias paralelas de contención para imagen pública, empresa y carrera profesional.', impact: 'Defendemos su nombre, no solo su expediente.' },
      { title: 'Tecnología Legal Avanzada', text: 'Usamos análisis documental, gestión segura de expedientes, monitoreo y organización de evidencia digital.', impact: 'Tecnología aplicada para responder más rápido y mejor.' },
    ],
  },
  final_cta: {
    titulo: 'Tu defensa no puede esperar',
    subtitulo: 'Agenda una consulta estratégica totalmente confidencial',
    boton: 'Contactar ahora',
    boton_url: '/contacto',
    boton2: 'Agendar cita',
    boton2_url: '/agenda',
  },
  testimonials_block: {
    eyebrow: 'Prueba social',
    titulo: 'Reserva absoluta en cada caso',
    subtitulo: 'Testimonios anónimos de clientes que confiaron asuntos sensibles a la firma.',
    testimonios: [
      { texto: 'Resolvieron un caso extremadamente delicado con absoluta reserva.', autor: 'Cliente confidencial' },
      { texto: 'Su estrategia evitó consecuencias irreparables para mi familia y mi empresa.', autor: 'Cliente confidencial' },
      { texto: 'Profesionalismo total. En el momento más crítico, su equipo respondió de inmediato.', autor: 'Cliente confidencial' },
    ],
  },
  footer: {
    descripcion: 'Defensa penal estrategica para personas, empresas y funcionarios frente a escenarios juridicos complejos.',
  },
  por_que_block: {
    titulo: 'Defendemos lo que una investigación puede poner en riesgo',
    subtitulo: 'Un proceso penal no solo compromete la libertad. Puede afectar toda una vida institucional, familiar y patrimonial.',
    items: ['Patrimonio', 'Empresas', 'Reputación', 'Trayectoria profesional', 'Estabilidad familiar'],
    texto: 'IMPERIUM IURIS nace para intervenir con precisión técnica antes de que una crisis jurídica genere daños irreversibles.',
    closing: 'Defendemos personas, empresas y futuros.',
  },
  equipo_block: {
    titulo: 'Casos complejos requieren múltiples especialistas',
    subtitulo: 'Nuestro modelo integra profesionales de distintas áreas para construir defensas más sólidas.',
    especialistas: [
      'Abogados penalistas',
      'Constitucionalistas',
      'Expertos en compliance',
      'Auditores forenses',
      'Especialistas financieros',
      'Peritos tecnológicos',
      'Criminalistas',
      'Consultores reputacionales',
    ],
    closing: 'Una sola perspectiva nunca resuelve crisis complejas.',
  },
  metodologia_block: {
    titulo: 'Metodología de Trabajo',
    subtitulo: 'Cada etapa reduce incertidumbre y aumenta control.',
    pasos: [
      { titulo: 'Diagnóstico inicial', texto: 'Identificamos riesgos inmediatos y evaluamos el escenario jurídico completo.' },
      { titulo: 'Investigación estratégica', texto: 'Analizamos información crítica, precedentes y contexto probatorio.' },
      { titulo: 'Diseño de defensa', texto: 'Construimos la ruta jurídica más efectiva para el caso específico.' },
      { titulo: 'Ejecución legal', texto: 'Actuamos procesalmente con precisión técnica y agilidad estratégica.' },
      { titulo: 'Protección integral', texto: 'Protegemos patrimonio, reputación y continuidad durante el proceso.' },
      { titulo: 'Seguimiento permanente', texto: 'Acompañamiento continuo hasta la resolución definitiva del caso.' },
    ],
  },
  confidencialidad_block: {
    titulo: 'La discreción es parte de nuestra defensa',
    subtitulo: 'Aplicamos protocolos estrictos para proteger información crítica antes, durante y después del proceso.',
    items: ['Documentación sensible', 'Información financiera', 'Datos corporativos', 'Reputación personal', 'Privacidad familiar'],
    closing: 'Lo que nos confía permanece protegido.',
  },
  cta_nosotros: {
    titulo: 'Cuando el riesgo aumenta, la improvisación desaparece',
    subtitulo: 'Converse con nuestro equipo y reciba una evaluación jurídica estratégica y confidencial.',
    boton_primary: 'Solicitar consulta confidencial',
    boton_secondary: 'Hablar con un especialista ahora',
  },
  imagenes: {
    hero_carousel: ['/IMG1.jpeg', '/IMG6.jpeg', '/IMG7.jpeg'],
    servicios: {
      personas:     '/IMG1.jpeg',
      empresas:     '/IMG5.jpeg',
      funcionarios: '/IMG2.jpeg',
      mediaticos:   '/IMG7.jpeg',
    },
    diferencial_carousel: ['/IMG1.jpeg', '/IMG5.jpeg', '/IMG2.jpeg', '/IMG6.jpeg', '/IMG7.jpeg', '/IMG8.jpeg'],
    galeria_nosotros: ['/IMG2.jpeg', '/IMG5.jpeg', '/IMG6.jpeg', '/IMG7.jpeg'],
    galeria_nosotros_eyebrow: 'Nuestra Firma',
    galeria_nosotros_titulo: 'Espacios diseñados para la excelencia',
  },
}

// ─── Helpers puros ────────────────────────────────────────────────────────────

export function buildWhatsAppUrl(whatsapp: string, mensaje: string): string {
  return `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`
}

export function generateSlots(cfg: HorarioCitasConfig): string[] {
  const [sh, sm] = cfg.hora_inicio.split(':').map(Number)
  const [eh, em] = cfg.hora_fin.split(':').map(Number)
  const start = sh * 60 + sm
  const end   = eh * 60 + em
  const slots: string[] = []
  for (let t = start; t < end; t += cfg.intervalo) {
    slots.push(`${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`)
  }
  return slots
}

export function isDateAvailable(
  fecha: string,
  cfg: HorarioCitasConfig,
  festivos: FestivosConfig,
): boolean {
  if (festivos.fechas.includes(fecha)) return false
  const day = new Date(fecha + 'T12:00:00').getDay()
  return cfg.dias.includes(day)
}

export function isOfficeHours(cfg: HorarioAtencionConfig): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Guayaquil',
    weekday: 'short',
    hour: '2-digit',
    hour12: false,
  }).formatToParts(new Date())

  const WEEKDAY: Record<string, number> = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 }
  const weekday = WEEKDAY[parts.find(p => p.type === 'weekday')?.value ?? ''] ?? -1
  const hour    = parseInt(parts.find(p => p.type === 'hour')?.value ?? '-1', 10)

  const [startH] = cfg.hora_inicio.split(':').map(Number)
  const [endH]   = cfg.hora_fin.split(':').map(Number)

  return cfg.dias.includes(weekday) && hour >= startH && hour < endH
}
