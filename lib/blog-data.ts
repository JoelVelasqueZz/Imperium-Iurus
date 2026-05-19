// IMPERIUM IURIS — T06 Blog básico
// Módulo: M1 — Sitio Web Público
// RF: RF-48, RF-49
// Desarrollado: 2026-05-19
export const blogPosts = [
  {
    slug: 'que-hacer-ante-una-detencion',
    title: '¿Que hacer ante una detencion? Guia legal inmediata',
    excerpt: 'Los primeros minutos tras una detencion son criticos. Conozca sus derechos constitucionales y como actuar.',
    category: 'Derecho Penal',
    readTime: '5 min',
    date: '2025-05-10',
    content:
      '<p>Una detencion exige calma, silencio estrategico y asistencia juridica inmediata. No firme documentos sin entender su alcance y solicite comunicarse con un abogado.</p><p>La defensa debe revisar legalidad de la aprehension, respeto de derechos constitucionales, evidencia inicial y riesgos procesales antes de cualquier declaracion.</p><h2>Primeras acciones</h2><p>Identifique la autoridad actuante, hora exacta, lugar, motivo de la detencion y testigos. Esa informacion permite activar recursos como habeas corpus o medidas de proteccion procesal.</p>',
  },
  {
    slug: 'como-actuar-investigacion-fiscal',
    title: 'Como actuar ante una investigacion de la Fiscalia',
    excerpt: 'Una notificacion fiscal no significa condena. Entienda el proceso y sus derechos procesales.',
    category: 'Penal Economico',
    readTime: '7 min',
    date: '2025-05-05',
    content:
      '<p>La investigacion fiscal debe abordarse con estrategia desde el primer contacto. El objetivo inicial es conocer el alcance, los hechos investigados y las diligencias pendientes.</p><p>Una respuesta desordenada puede ampliar riesgos patrimoniales, empresariales y reputacionales. La defensa temprana permite ordenar documentos, preparar versiones y anticipar escenarios.</p><h2>Gestion de riesgo</h2><p>Revise citaciones, pedidos de informacion, reportes financieros y posibles conexiones con autoridades de control como UAFE, SRI o Contraloria.</p>',
  },
  {
    slug: 'riesgos-penales-empresariales',
    title: 'Riesgos penales empresariales que toda empresa debe conocer',
    excerpt: 'Compliance, lavado de activos y responsabilidad penal de directivos: guia preventiva para empresas ecuatorianas.',
    category: 'Compliance',
    readTime: '8 min',
    date: '2025-04-28',
    content:
      '<p>Las empresas enfrentan riesgos penales en operaciones comerciales, financieras, tributarias y societarias. La prevencion exige controles internos, trazabilidad documental y protocolos de respuesta.</p><p>Un programa de compliance penal no debe ser decorativo: debe permitir detectar alertas, documentar decisiones y responder ante auditorias o investigaciones.</p><h2>Areas sensibles</h2><p>Fraude interno, lavado de activos, delitos tributarios, contratacion publica y responsabilidad de directivos requieren monitoreo permanente.</p>',
  },
]

export const blogCategories = ['Todos', ...Array.from(new Set(blogPosts.map((post) => post.category)))]

export type BlogPost = (typeof blogPosts)[number]
