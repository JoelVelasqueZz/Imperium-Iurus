// Tipos, defaults y funciones puras — sin imports de Supabase.
// Seguro para importar en client components.

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ContactoConfig = {
  whatsapp: string
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
}

export type FilosofiaPilarConfig = {
  title: string
  text: string
}

export type NosotrosPageConfig = {
  titulo: string
  intro: string
  pilares: FilosofiaPilarConfig[]
  por_que_texto: string
  vision: string
}

export type TrustCardConfig = {
  title: string
  body: string
}

export type TrustBlockConfig = {
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
  titulo: string
  subtitulo: string
  items: DifferentialItemConfig[]
}

export type UrgencyEscenarioConfig = {
  titulo: string
  subtitulo: string
  items: string[]
  boton: string
}

export type UrgencyBlockConfig = {
  texto_principal: string
  escenarios: UrgencyEscenarioConfig[]
}

export type FinalCtaConfig = {
  titulo: string
  boton: string
}

export type ImagenesConfig = {
  hero_carousel: string[]
  servicios: {
    personas: string
    empresas: string
    funcionarios: string
    mediaticos: string
  }
  galeria_nosotros: string[]
}

export type SiteConfig = {
  contacto: ContactoConfig
  horario_atencion: HorarioAtencionConfig
  horario_citas: HorarioCitasConfig
  festivos: FestivosConfig
  hero: HeroConfig
  redes_sociales: RedesSocialesConfig
  agenda_page: AgendaPageConfig
  nosotros_page: NosotrosPageConfig
  trust_block: TrustBlockConfig
  services_block: ServicesBlockConfig
  urgency_block: UrgencyBlockConfig
  differential_block: DifferentialBlockConfig
  final_cta: FinalCtaConfig
  imagenes: ImagenesConfig
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const CONFIG_DEFAULTS: SiteConfig = {
  contacto: {
    whatsapp:  '+593 985 222 635',
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
  },
  nosotros_page: {
    titulo: 'Defensa penal estratégica para escenarios complejos',
    intro:
      'Protegemos la libertad, el patrimonio, la reputación y la continuidad empresarial de nuestros clientes frente a investigaciones penales, riesgos regulatorios y crisis jurídicas de alta complejidad.',
    pilares: [
      { title: 'Prevención',       text: 'Anticipamos riesgos antes de que escalen.' },
      { title: 'Estrategia',       text: 'Cada caso requiere una ruta legal diseñada a medida.' },
      { title: 'Confidencialidad', text: 'Protegemos información sensible con absoluta reserva.' },
      { title: 'Resultados',       text: 'Nos enfocamos en soluciones concretas y sostenibles.' },
    ],
    por_que_texto:
      'IMPERIUM IURIS nace para intervenir con precisión técnica antes de que una crisis jurídica genere daños irreversibles.',
    vision:
      'Aspiramos a convertirnos en la firma penal estratégica más confiable, sofisticada e innovadora del país, integrando excelencia jurídica, tecnología y protección integral.',
  },
  trust_block: {
    titulo: 'Solidez, confidencialidad y capacidad real',
    subtitulo: 'Una estructura jurídica diseñada para intervenir en escenarios donde la improvisación no es una opción.',
    tarjetas: [
      { title: '+15 años de experiencia en litigación penal estratégica', body: 'Defendemos personas, empresarios, compañías y funcionarios frente a investigaciones penales complejas.' },
      { title: 'Casos complejos de alto impacto jurídico y patrimonial', body: 'Lavado de activos · Corrupción · Fraude · Delitos financieros · Criminalidad organizada · Delitos societarios' },
      { title: 'Reserva total en asuntos sensibles', body: 'Protegemos la información, reputación y seguridad de nuestros clientes mediante protocolos estrictos.' },
      { title: 'Sede en Guayaquil | Cobertura en todo Ecuador', body: 'Guayaquil · Quito · Cuenca · Manta · Machala · Santo Domingo · Ambato · y más jurisdicciones.' },
      { title: 'Defensa respaldada por especialistas multidisciplinarios', body: 'Penalistas · Constitucionalistas · Tributaristas · Criminalistas · Auditores forenses · Analistas financieros' },
      { title: 'Prevención legal + defensa inmediata', body: 'Compliance penal · Investigaciones internas · Prevención corporativa · Defensa procesal · Litigación penal' },
    ],
  },
  services_block: {
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
    texto_principal:
      'Actuamos de manera inmediata cuando su libertad, patrimonio, empresa o reputación están en riesgo.',
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
    titulo: '¿Por qué IMPERIUM IURIS es diferente?',
    subtitulo: 'Combinamos defensa penal estratégica, inteligencia jurídica y protección integral para casos de alta complejidad.',
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
    boton:  'Contactar ahora',
  },
  imagenes: {
    hero_carousel: ['/IMG1.jpeg', '/IMG6.jpeg', '/IMG7.jpeg'],
    servicios: {
      personas:     '/IMG1.jpeg',
      empresas:     '/IMG5.jpeg',
      funcionarios: '/IMG2.jpeg',
      mediaticos:   '/IMG7.jpeg',
    },
    galeria_nosotros: ['/IMG2.jpeg', '/IMG5.jpeg', '/IMG6.jpeg', '/IMG7.jpeg'],
  },
}

// ─── Helpers puros ────────────────────────────────────────────────────────────

export function buildWhatsAppUrl(
  whatsapp: string,
  message = 'Hola, necesito asistencia legal urgente de IMPERIUM IURIS',
): string {
  return `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
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
