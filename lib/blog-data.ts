// IMPERIUM IURIS — T06 Blog básico
// Módulo: M1 — Sitio Web Público
// RF: RF-48, RF-49
export const blogPosts = [
  {
    slug: 'que-hacer-ante-una-detencion',
    title: '¿Qué hacer ante una detención? Guía legal inmediata',
    excerpt:
      'Los primeros minutos tras una detención son críticos. Conozca sus derechos constitucionales y cómo actuar.',
    category: 'Derecho Penal',
    readTime: '5 min',
    date: '2025-05-10',
    content:
      '<p>Una detención exige calma, silencio estratégico y asistencia jurídica inmediata. No firme documentos sin entender su alcance y solicite comunicarse con un abogado.</p><p>La defensa debe revisar la legalidad de la aprehensión, el respeto de los derechos constitucionales, la evidencia inicial y los riesgos procesales antes de cualquier declaración.</p><h2>Primeras acciones</h2><p>Identifique la autoridad actuante, la hora exacta, el lugar, el motivo de la detención y los testigos presentes. Esa información permite activar recursos como hábeas corpus o medidas de protección procesal.</p>',
  },
  {
    slug: 'como-actuar-investigacion-fiscal',
    title: 'Cómo actuar ante una investigación de la Fiscalía',
    excerpt:
      'Una notificación fiscal no significa condena. Entienda el proceso y sus derechos procesales.',
    category: 'Penal Económico',
    readTime: '7 min',
    date: '2025-05-05',
    content:
      '<p>La investigación fiscal debe abordarse con estrategia desde el primer contacto. El objetivo inicial es conocer el alcance, los hechos investigados y las diligencias pendientes.</p><p>Una respuesta desordenada puede ampliar riesgos patrimoniales, empresariales y reputacionales. La defensa temprana permite ordenar documentos, preparar versiones y anticipar escenarios.</p><h2>Gestión de riesgo</h2><p>Revise citaciones, pedidos de información, reportes financieros y posibles conexiones con autoridades de control como UAFE, SRI o Contraloría.</p>',
  },
  {
    slug: 'riesgos-penales-empresariales',
    title: 'Riesgos penales empresariales que toda empresa debe conocer',
    excerpt:
      'Compliance, lavado de activos y responsabilidad penal de directivos: guía preventiva para empresas ecuatorianas.',
    category: 'Compliance',
    readTime: '8 min',
    date: '2025-04-28',
    content:
      '<p>Las empresas enfrentan riesgos penales en operaciones comerciales, financieras, tributarias y societarias. La prevención exige controles internos, trazabilidad documental y protocolos de respuesta.</p><p>Un programa de compliance penal no debe ser decorativo: debe permitir detectar alertas, documentar decisiones y responder ante auditorías o investigaciones.</p><h2>Áreas sensibles</h2><p>Fraude interno, lavado de activos, delitos tributarios, contratación pública y responsabilidad de directivos requieren monitoreo permanente.</p>',
  },
]

export const blogCategories = ['Todos', ...Array.from(new Set(blogPosts.map((post) => post.category)))]

export type BlogPost = (typeof blogPosts)[number]
