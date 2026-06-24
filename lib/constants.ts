import {
  BadgeCheck,
  Building2,
  Eye,
  FileWarning,
  Gavel,
  Landmark,
  Laptop,
  Lock,
  MapPin,
  Scale,
  Shield,
  Siren,
  Sparkles,
  User,
  Users,
  Zap,
} from 'lucide-react'

// ─── Identidad y contacto ─────────────────────────────────────────────────────

export const CONTACT = {
  phone: '+593 XX XXX XXXX',
  whatsapp: '+593XXXXXXXXX',
  email: 'contacto@imperiumiuris.ec',
  address: 'Guayaquil, Ecuador',
  hours: 'Lun-Vie 08:00-18:00',
  emergency: '24/7 para urgencias penales',
  social: ['LinkedIn', 'Instagram', 'Facebook'],
}

// ─── WhatsApp 24/7 ────────────────────────────────────────────────────────────
// El número real vive en NEXT_PUBLIC_WHATSAPP_NUMBER (.env.local) para poder
// cambiarlo sin tocar código.

export const WHATSAPP_EMERGENCY_MESSAGE = 'Hola, necesito asistencia legal urgente de IMPERIUM IURIS'

export function getWhatsAppUrl(message: string = WHATSAPP_EMERGENCY_MESSAGE) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || CONTACT.whatsapp).replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export const BRAND = {
  name: 'IMPERIUM IURIS',
  tagline: 'Defensa Penal Estratégica de Alto Nivel',
  slogan: 'El derecho se convierte en poder',
  location: 'Guayaquil · Ecuador · Cobertura Nacional',
}

export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

// ─── Texto de secciones — HOME ────────────────────────────────────────────────
// Fuente única de verdad para todo el texto del home. Los componentes no
// deben tener strings literales de contenido: deben referenciar estas claves.

export const HOME = {
  hero: {
    titleBefore: 'Defensa Penal',
    titleHighlight: 'Estratégica',
    titleAfter: 'de Alto Nivel',
    subtitle:
      'Protegemos tu libertad, patrimonio, reputación y futuro mediante estrategias jurídicas multidisciplinarias diseñadas para casos complejos.',
    emotional: 'Cada minuto importa cuando tu libertad está en riesgo.',
    ctas: {
      primary: 'Solicitar consulta confidencial',
      urgent: 'Atención inmediata 24/7',
      tertiary: 'Evaluación legal estratégica',
    },
  },
  trust: {
    eyebrow: 'Confianza inmediata',
    title: 'Solidez, confidencialidad y capacidad real',
    subtitle:
      'Una estructura jurídica diseñada para intervenir en escenarios donde la improvisación no es una opción.',
  },
  services: {
    eyebrow: 'Áreas de práctica',
    title: '¿En qué podemos ayudarte?',
    subtitle:
      'Identifique rápidamente el tipo de riesgo y active una respuesta jurídica proporcional a la amenaza.',
  },
  urgency: {
    eyebrow: 'Intervención inmediata',
    title: '¿Enfrenta una situación penal urgente?',
    subtitle:
      'Actuamos de manera inmediata cuando su libertad, patrimonio, empresa o reputación están en riesgo.',
    badge: 'Atención confidencial. Respuesta estratégica. Intervención inmediata.',
    cta: 'Hablar con abogado ahora',
    footer: 'Respuesta confidencial | Atención inmediata | Cobertura nacional',
  },
  differential: {
    eyebrow: 'No somos un despacho penal tradicional',
    title: '¿Por qué IMPERIUM IURIS es diferente?',
    subtitle:
      'Combinamos defensa penal estratégica, inteligencia jurídica y protección integral para casos de alta complejidad.',
    closing: 'Casos complejos requieren estructuras superiores',
    cta: 'Solicitar evaluación confidencial',
  },
  testimonials: {
    eyebrow: 'Prueba social',
    title: 'Reserva absoluta en cada caso',
    subtitle: 'Testimonios anónimos de clientes que confiaron asuntos sensibles a la firma.',
  },
  finalCta: {
    title: 'Tu defensa no puede esperar',
    subtitle: 'Agenda una consulta estratégica totalmente confidencial.',
    cta: 'Contactar ahora',
  },
}

// ─── Texto de secciones — NOSOTROS ───────────────────────────────────────────

export const NOSOTROS = {
  apertura: {
    eyebrow: 'Nosotros',
    title: 'Defensa penal estratégica para escenarios complejos',
    intro:
      'Protegemos la libertad, el patrimonio, la reputación y la continuidad empresarial de nuestros clientes frente a investigaciones penales, riesgos regulatorios y crisis jurídicas de alta complejidad.',
    description:
      'IMPERIUM IURIS es una firma jurídica multidisciplinaria con sede en Guayaquil y cobertura nacional, especializada en derecho penal estratégico, penal económico, criminalidad empresarial, delitos contra la administración pública y defensa en investigaciones complejas.',
    tagline:
      'Nuestra práctica combina litigación técnica, análisis preventivo y respuesta inmediata para personas, empresas, directivos y funcionarios públicos.',
  },
  filosofia: {
    title: 'Nuestra Filosofía',
    subtitle: 'Cuatro principios sostienen cada decisión jurídica de la firma.',
    closing: 'No reaccionamos al problema. Lo anticipamos y lo controlamos.',
  },
  porQue: {
    title: 'Defendemos lo que una investigación puede poner en riesgo',
    subtitle:
      'Un proceso penal no solo compromete la libertad. Puede afectar toda una vida institucional, familiar y patrimonial.',
    closing1:
      'IMPERIUM IURIS nace para intervenir con precisión técnica antes de que una crisis jurídica genere daños irreversibles.',
    closing2: 'Defendemos personas, empresas y futuros.',
  },
  equipo: {
    title: 'Casos complejos requieren múltiples especialistas',
    subtitle: 'Nuestro modelo integra profesionales de distintas áreas para construir defensas más sólidas.',
    closing: 'Una sola perspectiva nunca resuelve crisis complejas.',
  },
  metodologia: {
    title: 'Metodología de Trabajo',
    subtitle: 'Cada etapa reduce incertidumbre y aumenta control.',
  },
  confidencialidad: {
    title: 'La discreción es parte de nuestra defensa',
    subtitle:
      'Aplicamos protocolos estrictos para proteger información crítica antes, durante y después del proceso.',
    closing: 'Lo que nos confía permanece protegido.',
  },
  vision: {
    title: 'Construimos una nueva generación de defensa penal en Ecuador',
    body: 'Aspiramos a convertirnos en la firma penal estratégica más confiable, sofisticada e innovadora del país, integrando excelencia jurídica, tecnología y protección integral.',
    tagline: 'Defensa penal de nivel internacional adaptada a Ecuador.',
  },
  cta: {
    title: 'Cuando el riesgo aumenta, la improvisación desaparece',
    subtitle: 'Converse con nuestro equipo y reciba una evaluación jurídica estratégica y confidencial.',
    primary: 'Solicitar consulta confidencial',
    secondary: 'Hablar con un especialista ahora',
  },
}

// ─── Bloque de confianza ──────────────────────────────────────────────────────

export const trustCards = [
  {
    icon: Shield,
    title: '+15 años de experiencia en litigación penal estratégica',
    body: 'Defendemos personas, empresarios, compañías y funcionarios frente a investigaciones penales complejas.',
    sub: 'Experiencia en delitos económicos, patrimoniales, corporativos y criminalidad organizada.',
  },
  {
    icon: Gavel,
    title: 'Casos complejos de alto impacto jurídico y patrimonial',
    body: 'Lavado de activos · Corrupción · Fraude · Delitos financieros · Criminalidad organizada · Delitos societarios',
    sub: 'Diseñamos estrategias donde otros solo reaccionan.',
  },
  {
    icon: Lock,
    title: 'Reserva total en asuntos sensibles',
    body: 'Protegemos la información, reputación y seguridad de nuestros clientes mediante protocolos estrictos.',
    sub: 'Discreción absoluta antes, durante y después del proceso.',
  },
  {
    icon: MapPin,
    title: 'Sede en Guayaquil | Cobertura en todo Ecuador',
    body: 'Guayaquil · Quito · Cuenca · Manta · Machala · Santo Domingo · Ambato · y más jurisdicciones.',
    sub: 'Respuesta jurídica inmediata donde el cliente lo necesite.',
  },
  {
    icon: Users,
    title: 'Defensa respaldada por especialistas multidisciplinarios',
    body: 'Penalistas · Constitucionalistas · Tributaristas · Criminalistas · Auditores forenses · Analistas financieros',
    sub: 'Cada caso requiere más que abogados.',
  },
  {
    icon: Zap,
    title: 'Prevención legal + defensa inmediata',
    body: 'Compliance penal · Investigaciones internas · Prevención corporativa · Defensa procesal · Litigación penal',
    sub: 'Prevención inteligente. Defensa contundente.',
  },
]

// ─── Áreas de práctica ────────────────────────────────────────────────────────

export const serviceBlocks = [
  {
    id: 'personas',
    icon: User,
    title: 'Personas Naturales',
    headline: 'Protección inmediata cuando tu libertad está en riesgo',
    desc: 'Defendemos a personas que enfrentan investigaciones, detenciones o procesos penales.',
    services: [
      'Detenciones en flagrancia',
      'Audiencias de formulación de cargos',
      'Prisión preventiva',
      'Habeas corpus',
      'Recursos constitucionales',
      'Delitos patrimoniales',
      'Delitos informáticos',
      'Medidas cautelares',
    ],
    impact: 'Actuamos desde el primer minuto para proteger tus derechos.',
  },
  {
    id: 'empresas',
    icon: Building2,
    title: 'Empresas',
    headline: 'Protección penal corporativa y empresarial',
    desc: 'Asesoramos empresas y directivos frente a riesgos penales de operaciones financieras.',
    services: [
      'Compliance penal corporativo',
      'Investigaciones internas',
      'Fraude corporativo',
      'Lavado de activos',
      'Delitos tributarios',
      'Riesgos societarios',
      'Delitos aduaneros',
      'Protección de directivos',
    ],
    impact: 'Prevenimos crisis penales antes de que destruyan empresas.',
  },
  {
    id: 'funcionarios',
    icon: Landmark,
    title: 'Funcionarios Públicos',
    headline: 'Defensa técnica frente a investigaciones estatales',
    desc: 'Defendemos a funcionarios y exfuncionarios frente a investigaciones de administración pública.',
    services: [
      'Peculado',
      'Concusión',
      'Cohecho',
      'Enriquecimiento ilícito',
      'Tráfico de influencias',
      'Contratación pública',
      'Defensa ante Contraloría',
      'Defensa ante Fiscalía',
    ],
    impact: 'Defensa estratégica frente al poder punitivo del Estado.',
  },
  {
    id: 'mediaticos',
    icon: Eye,
    title: 'Casos de Alta Exposición Mediática',
    headline: 'Protección legal y reputacional en crisis públicas',
    desc: 'Intervenimos en casos donde el riesgo jurídico viene con presión mediática y daño reputacional.',
    services: [
      'Gestión de crisis reputacional',
      'Estrategia legal frente a medios',
      'Casos de alta visibilidad pública',
      'Protección de imagen corporativa',
      'Comunicación estratégica',
      'Manejo preventivo de crisis',
    ],
    impact: 'Defendemos tu caso y protegemos tu reputación.',
  },
]

// ─── Urgencia ─────────────────────────────────────────────────────────────────

export const urgencyCases = [
  {
    title: '¿Fuiste detenido?',
    headline: 'Defensa inmediata desde el primer minuto',
    text: 'Cada decisión tomada en las primeras horas puede definir el futuro del proceso.',
    items: [
      'Detenciones en flagrancia',
      'Órdenes de captura',
      'Audiencias',
      'Prisión preventiva',
      'Allanamientos',
      'Habeas corpus',
      'Cautelares',
    ],
    button: 'Necesito defensa inmediata',
  },
  {
    title: '¿Recibiste una notificación fiscal?',
    headline: 'Defensa frente a investigaciones financieras y patrimoniales',
    text: 'Asistimos a empresarios, directivos, profesionales y particulares ante autoridades de control.',
    items: ['Fiscalía', 'UAFE', 'SRI', 'Contraloría', 'Superintendencias', 'Lavado de activos', 'Delitos financieros'],
    button: 'Solicitar análisis confidencial',
  },
  {
    title: '¿Tu empresa está siendo investigada?',
    headline: 'Protección penal corporativa y continuidad empresarial',
    text: 'Diseñamos estrategias inmediatas para riesgos penales, regulatorios o reputacionales.',
    items: [
      'Compliance',
      'Fraude interno',
      'Delitos societarios',
      'Lavado',
      'Aduaneros',
      'Directivos',
      'Investigaciones internas',
    ],
    button: 'Hablar con un especialista corporativo',
  },
]

// ─── Diferencial ──────────────────────────────────────────────────────────────

export const differentialItems = [
  {
    icon: FileWarning,
    title: 'Diagnóstico Estratégico Inmediato',
    text: 'Analizamos riesgo penal, exposición patrimonial, impacto empresarial y consecuencias reputacionales.',
    impact: 'Cada minuto sin estrategia aumenta el riesgo.',
  },
  {
    icon: Users,
    title: 'Defensa Multidisciplinaria',
    text: 'Integramos penal, constitucional, compliance, auditoría forense, criminalística y análisis financiero.',
    impact: 'Casos complejos requieren múltiples especialistas.',
  },
  {
    icon: Lock,
    title: 'Máxima Confidencialidad',
    text: 'Aplicamos protocolos para proteger información sensible, documentos, patrimonio y privacidad.',
    impact: 'Su caso permanece donde debe estar: protegido.',
  },
  {
    icon: Scale,
    title: 'Litigación de Alto Impacto',
    text: 'Representamos casos de lavado de activos, delincuencia organizada, fraude y delitos financieros.',
    impact: 'Defendemos donde las consecuencias son más severas.',
  },
  {
    icon: BadgeCheck,
    title: 'Protección Reputacional',
    text: 'Trabajamos estrategias paralelas de contención para imagen pública, empresa y carrera profesional.',
    impact: 'Defendemos su nombre, no solo su expediente.',
  },
  {
    icon: Laptop,
    title: 'Tecnología Legal Avanzada',
    text: 'Usamos análisis documental, gestión segura de expedientes, monitoreo y organización de evidencia digital.',
    impact: 'Tecnología aplicada para responder más rápido y mejor.',
  },
]

// ─── Testimonios ──────────────────────────────────────────────────────────────

export const testimonials = [
  'Resolvieron un caso extremadamente delicado con absoluta reserva.',
  'Su estrategia evitó consecuencias irreparables para mi familia y mi empresa.',
  'Profesionalismo total. En el momento más crítico, su equipo respondió de inmediato.',
]

// ─── Filosofía — Nosotros ─────────────────────────────────────────────────────

export const philosophyPillars = [
  { roman: 'I', title: 'Prevención', text: 'Anticipamos riesgos antes de que escalen.' },
  { roman: 'II', title: 'Estrategia', text: 'Cada caso requiere una ruta legal diseñada a medida.' },
  { roman: 'III', title: 'Confidencialidad', text: 'Protegemos información sensible con absoluta reserva.' },
  { roman: 'IV', title: 'Resultados', text: 'Nos enfocamos en soluciones concretas y sostenibles.' },
]

// ─── ¿Por qué existimos? — Nosotros ──────────────────────────────────────────

export const riskList = [
  'Patrimonio',
  'Empresas',
  'Reputación',
  'Trayectoria profesional',
  'Estabilidad familiar',
]

// ─── Equipo — Nosotros ────────────────────────────────────────────────────────

export const specialists = [
  'Abogados penalistas',
  'Constitucionalistas',
  'Expertos en compliance',
  'Auditores forenses',
  'Especialistas financieros',
  'Peritos tecnológicos',
  'Criminalistas',
  'Consultores reputacionales',
]

// ─── Metodología — Nosotros ───────────────────────────────────────────────────

export const methodologySteps: [string, string][] = [
  ['Diagnóstico inicial', 'Identificamos riesgos inmediatos y evaluamos el escenario jurídico completo.'],
  ['Investigación estratégica', 'Analizamos información crítica, precedentes y contexto probatorio.'],
  ['Diseño de defensa', 'Construimos la ruta jurídica más efectiva para el caso específico.'],
  ['Ejecución legal', 'Actuamos procesalmente con precisión técnica y agilidad estratégica.'],
  ['Protección integral', 'Protegemos patrimonio, reputación y continuidad durante el proceso.'],
  ['Seguimiento permanente', 'Acompañamiento continuo hasta la resolución definitiva del caso.'],
]

// ─── Confidencialidad — Nosotros ──────────────────────────────────────────────

export const confidentialityItems = [
  'Documentación sensible',
  'Información financiera',
  'Datos corporativos',
  'Reputación personal',
  'Privacidad familiar',
]

// ─── Tipos de consulta (formulario) ──────────────────────────────────────────

export const contactTypes = [
  { value: 'personal', label: 'Consulta personal', icon: User },
  { value: 'empresarial', label: 'Consulta empresarial', icon: Building2 },
  { value: 'funcionario', label: 'Funcionario público', icon: Landmark },
  { value: 'urgencia', label: 'Urgencia penal', icon: Siren },
  { value: 'otro', label: 'Otro asunto', icon: Sparkles },
]
