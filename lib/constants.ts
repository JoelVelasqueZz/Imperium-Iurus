// IMPERIUM IURIS — T01 Datos institucionales
// Módulo: M1 — Sitio Web Público
// RF: RF-01, RF-02, RF-18, RF-43, RF-52
// Desarrollado: 2026-05-19
import {
  BadgeCheck,
  Banknote,
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

export const CONTACT = {
  phone: '+593 XX XXX XXXX',
  whatsapp: '+593XXXXXXXXX',
  email: 'contacto@imperiumiuris.ec',
  address: 'Guayaquil, Ecuador',
  hours: 'Lun-Vie 08:00-18:00',
  emergency: '24/7 para urgencias penales',
  social: ['LinkedIn', 'Instagram', 'Facebook'],
}

export const BRAND = {
  name: 'IMPERIUM IURIS',
  tagline: 'Defensa Penal Estrategica de Alto Nivel',
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

export const trustCards = [
  {
    icon: Shield,
    title: '+15 años de experiencia en litigacion penal estrategica',
    body: 'Defendemos personas, empresarios, compañías y funcionarios frente a investigaciones penales complejas.',
    sub: 'Experiencia en delitos economicos, patrimoniales, corporativos y criminalidad organizada.',
  },
  {
    icon: Gavel,
    title: 'Casos complejos de alto impacto juridico y patrimonial',
    body: 'Lavado de activos · Corrupcion · Fraude · Delitos financieros · Criminalidad organizada · Delitos societarios',
    sub: 'Diseñamos estrategias donde otros solo reaccionan.',
  },
  {
    icon: Lock,
    title: 'Reserva total en asuntos sensibles',
    body: 'Protegemos la informacion, reputacion y seguridad de nuestros clientes mediante protocolos estrictos.',
    sub: 'Discrecion absoluta antes, durante y despues del proceso.',
  },
  {
    icon: MapPin,
    title: 'Sede en Guayaquil | Cobertura en todo Ecuador',
    body: 'Guayaquil · Quito · Cuenca · Manta · Machala · Santo Domingo · Ambato · y mas jurisdicciones.',
    sub: 'Respuesta juridica inmediata donde el cliente lo necesite.',
  },
  {
    icon: Users,
    title: 'Defensa respaldada por especialistas multidisciplinarios',
    body: 'Penalistas · Constitucionalistas · Tributaristas · Criminalistas · Auditores forenses · Analistas financieros',
    sub: 'Cada caso requiere mas que abogados.',
  },
  {
    icon: Zap,
    title: 'Prevencion legal + defensa inmediata',
    body: 'Compliance penal · Investigaciones internas · Prevencion corporativa · Defensa procesal · Litigacion penal',
    sub: 'Prevencion inteligente. Defensa contundente.',
  },
]

export const serviceBlocks = [
  {
    id: 'personas',
    icon: User,
    title: 'Personas Naturales',
    headline: 'Proteccion inmediata cuando tu libertad esta en riesgo',
    desc: 'Defendemos a personas que enfrentan investigaciones, detenciones o procesos penales.',
    services: [
      'Detenciones en flagrancia',
      'Audiencias de formulacion de cargos',
      'Prision preventiva',
      'Habeas corpus',
      'Recursos constitucionales',
      'Delitos patrimoniales',
      'Delitos informaticos',
      'Medidas cautelares',
    ],
    impact: 'Actuamos desde el primer minuto para proteger tus derechos.',
  },
  {
    id: 'empresas',
    icon: Building2,
    title: 'Empresas',
    headline: 'Proteccion penal corporativa y empresarial',
    desc: 'Asesoramos empresas y directivos frente a riesgos penales de operaciones financieras.',
    services: [
      'Compliance penal corporativo',
      'Investigaciones internas',
      'Fraude corporativo',
      'Lavado de activos',
      'Delitos tributarios',
      'Riesgos societarios',
      'Delitos aduaneros',
      'Auditorias preventivas',
    ],
    impact: 'Prevenimos crisis penales antes de que destruyan empresas.',
  },
  {
    id: 'funcionarios',
    icon: Landmark,
    title: 'Funcionarios Publicos',
    headline: 'Defensa tecnica frente a investigaciones estatales',
    desc: 'Defendemos a funcionarios y exfuncionarios frente a investigaciones de administracion publica.',
    services: [
      'Peculado',
      'Concusion',
      'Cohecho',
      'Enriquecimiento ilicito',
      'Trafico de influencias',
      'Contratacion publica',
      'Defensa ante Contraloria',
      'Defensa ante Fiscalia',
    ],
    impact: 'Defensa estrategica frente al poder punitivo del Estado.',
  },
  {
    id: 'mediaticos',
    icon: Eye,
    title: 'Casos de Alta Exposicion Mediatica',
    headline: 'Proteccion legal y reputacional en crisis publicas',
    desc: 'Intervenimos en casos donde el riesgo juridico viene con presion mediatica y daño reputacional.',
    services: [
      'Gestion de crisis reputacional',
      'Estrategia legal frente a medios',
      'Casos de alta visibilidad publica',
      'Proteccion de imagen corporativa',
      'Comunicacion estrategica',
      'Manejo preventivo de crisis',
    ],
    impact: 'Defendemos tu caso y protegemos tu reputacion.',
  },
]

export const urgencyCases = [
  {
    title: '¿Fuiste detenido?',
    headline: 'Defensa inmediata desde el primer minuto',
    text: 'Cada decision tomada en las primeras horas puede definir el futuro del proceso.',
    items: ['Detenciones en flagrancia', 'Ordenes de captura', 'Audiencias', 'Prision preventiva', 'Allanamientos', 'Habeas corpus', 'Cautelares'],
    button: 'Necesito defensa inmediata',
  },
  {
    title: '¿Recibiste una notificacion fiscal?',
    headline: 'Defensa frente a investigaciones financieras y patrimoniales',
    text: 'Asistimos a empresarios, directivos, profesionales y particulares ante autoridades de control.',
    items: ['Fiscalia', 'UAFE', 'SRI', 'Contraloria', 'Superintendencias', 'Lavado de activos', 'Delitos financieros'],
    button: 'Solicitar analisis confidencial',
  },
  {
    title: '¿Tu empresa esta siendo investigada?',
    headline: 'Proteccion penal corporativa y continuidad empresarial',
    text: 'Diseñamos estrategias inmediatas para riesgos penales, regulatorios o reputacionales.',
    items: ['Compliance', 'Fraude interno', 'Delitos societarios', 'Lavado', 'Aduaneros', 'Directivos', 'Investigaciones internas'],
    button: 'Hablar con un especialista corporativo',
  },
]

export const differentialItems = [
  {
    icon: FileWarning,
    title: 'Diagnostico Estrategico Inmediato',
    text: 'Analizamos riesgo penal, exposicion patrimonial, impacto empresarial y consecuencias reputacionales.',
    impact: 'Cada minuto sin estrategia aumenta el riesgo.',
  },
  {
    icon: Users,
    title: 'Defensa Multidisciplinaria',
    text: 'Integramos penal, constitucional, compliance, auditoria forense, criminalistica y analisis financiero.',
    impact: 'Casos complejos requieren multiples especialistas.',
  },
  {
    icon: Lock,
    title: 'Maxima Confidencialidad',
    text: 'Aplicamos protocolos para proteger informacion sensible, documentos, patrimonio y privacidad.',
    impact: 'Su caso permanece donde debe estar: protegido.',
  },
  {
    icon: Scale,
    title: 'Litigacion de Alto Impacto',
    text: 'Representamos casos de lavado de activos, delincuencia organizada, fraude y delitos financieros.',
    impact: 'Defendemos donde las consecuencias son mas severas.',
  },
  {
    icon: BadgeCheck,
    title: 'Proteccion Reputacional',
    text: 'Trabajamos estrategias paralelas de contencion para imagen publica, empresa y carrera profesional.',
    impact: 'Defendemos su nombre, no solo su expediente.',
  },
  {
    icon: Laptop,
    title: 'Tecnologia Legal Avanzada',
    text: 'Usamos analisis documental, gestion segura de expedientes, monitoreo y organizacion de evidencia digital.',
    impact: 'Tecnologia aplicada para responder mas rapido y mejor.',
  },
]

export const testimonials = [
  'Resolvieron un caso extremadamente delicado con absoluta reserva.',
  'Su estrategia evito consecuencias irreparables.',
  'Profesionalismo total.',
]

export const philosophyPillars = [
  { roman: 'I', title: 'Prevencion', text: 'Anticipamos riesgos antes de que escalen.' },
  { roman: 'II', title: 'Estrategia', text: 'Cada caso requiere una ruta legal diseñada a medida.' },
  { roman: 'III', title: 'Confidencialidad', text: 'Protegemos informacion sensible con absoluta reserva.' },
  { roman: 'IV', title: 'Resultados', text: 'Nos enfocamos en soluciones concretas y sostenibles.' },
]

export const riskList = ['patrimonio', 'empresas', 'reputacion', 'trayectoria profesional', 'estabilidad familiar']

export const specialists = [
  'Abogados penalistas',
  'Constitucionalistas',
  'Expertos en compliance',
  'Auditores forenses',
  'Especialistas financieros',
  'Peritos tecnologicos',
  'Criminalistas',
  'Consultores reputacionales',
]

export const methodologySteps = [
  ['Diagnostico inicial', 'Identificamos riesgos inmediatos'],
  ['Investigacion estrategica', 'Analizamos informacion critica'],
  ['Diseño de defensa', 'Construimos la ruta juridica'],
  ['Ejecucion legal', 'Actuamos procesalmente'],
  ['Proteccion integral', 'Protegemos patrimonio y reputacion'],
  ['Seguimiento permanente', 'Acompañamiento continuo'],
]

export const confidentialityItems = ['documentacion sensible', 'informacion financiera', 'datos corporativos', 'reputacion personal', 'privacidad familiar']

export const contactTypes = [
  { value: 'personal', label: 'Consulta personal', icon: User },
  { value: 'empresarial', label: 'Consulta empresarial', icon: Building2 },
  { value: 'funcionario', label: 'Funcionario publico', icon: Landmark },
  { value: 'urgencia', label: 'Urgencia penal', icon: Siren },
  { value: 'otro', label: 'Otro asunto', icon: Sparkles },
]
