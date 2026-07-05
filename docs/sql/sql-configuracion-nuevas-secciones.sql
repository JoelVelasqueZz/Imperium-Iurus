-- IMPERIUM IURIS — Nuevas secciones del panel de configuración
-- Ejecutar en el SQL Editor de Supabase.

-- ───────────────────────────────────────────────────────────────────────────
-- 1. Bucket de Storage para imágenes del sitio (subida desde /admin/configuracion)
-- ───────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- ───────────────────────────────────────────────────────────────────────────
-- 2. Valores iniciales para las nuevas claves de configuración
--    (idénticos a CONFIG_DEFAULTS en lib/config-utils.ts — sirven de semilla
--    para que la fila exista en la tabla `configuracion` desde el día uno)
-- ───────────────────────────────────────────────────────────────────────────

insert into public.configuracion (clave, valor) values
('agenda_page', '{
  "eyebrow": "Agenda tu cita",
  "titulo": "Reserva una consulta confidencial",
  "subtitulo": "Selecciona fecha y horario disponible. Te confirmaremos por correo a la brevedad."
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('nosotros_page', '{
  "titulo": "Defensa penal estratégica para escenarios complejos",
  "intro": "Protegemos la libertad, el patrimonio, la reputación y la continuidad empresarial de nuestros clientes frente a investigaciones penales, riesgos regulatorios y crisis jurídicas de alta complejidad.",
  "pilares": [
    { "title": "Prevención", "text": "Anticipamos riesgos antes de que escalen." },
    { "title": "Estrategia", "text": "Cada caso requiere una ruta legal diseñada a medida." },
    { "title": "Confidencialidad", "text": "Protegemos información sensible con absoluta reserva." },
    { "title": "Resultados", "text": "Nos enfocamos en soluciones concretas y sostenibles." }
  ],
  "por_que_texto": "IMPERIUM IURIS nace para intervenir con precisión técnica antes de que una crisis jurídica genere daños irreversibles.",
  "vision": "Aspiramos a convertirnos en la firma penal estratégica más confiable, sofisticada e innovadora del país, integrando excelencia jurídica, tecnología y protección integral."
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('trust_block', '{
  "tarjetas": [
    { "title": "+15 años de experiencia en litigación penal estratégica", "body": "Defendemos personas, empresarios, compañías y funcionarios frente a investigaciones penales complejas." },
    { "title": "Casos complejos de alto impacto jurídico y patrimonial", "body": "Lavado de activos · Corrupción · Fraude · Delitos financieros · Criminalidad organizada · Delitos societarios" },
    { "title": "Reserva total en asuntos sensibles", "body": "Protegemos la información, reputación y seguridad de nuestros clientes mediante protocolos estrictos." },
    { "title": "Sede en Guayaquil | Cobertura en todo Ecuador", "body": "Guayaquil · Quito · Cuenca · Manta · Machala · Santo Domingo · Ambato · y más jurisdicciones." },
    { "title": "Defensa respaldada por especialistas multidisciplinarios", "body": "Penalistas · Constitucionalistas · Tributaristas · Criminalistas · Auditores forenses · Analistas financieros" },
    { "title": "Prevención legal + defensa inmediata", "body": "Compliance penal · Investigaciones internas · Prevención corporativa · Defensa procesal · Litigación penal" }
  ]
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('urgency_block', '{
  "texto_principal": "Actuamos de manera inmediata cuando su libertad, patrimonio, empresa o reputación están en riesgo.",
  "escenarios": [
    {
      "titulo": "¿Fuiste detenido?",
      "subtitulo": "Defensa inmediata desde el primer minuto",
      "items": ["Detenciones en flagrancia", "Órdenes de captura", "Audiencias", "Prisión preventiva", "Allanamientos", "Habeas corpus", "Cautelares"],
      "boton": "Necesito defensa inmediata"
    },
    {
      "titulo": "¿Recibiste una notificación fiscal?",
      "subtitulo": "Defensa frente a investigaciones financieras y patrimoniales",
      "items": ["Fiscalía", "UAFE", "SRI", "Contraloría", "Superintendencias", "Lavado de activos", "Delitos financieros"],
      "boton": "Solicitar análisis confidencial"
    },
    {
      "titulo": "¿Tu empresa está siendo investigada?",
      "subtitulo": "Protección penal corporativa y continuidad empresarial",
      "items": ["Compliance", "Fraude interno", "Delitos societarios", "Lavado", "Aduaneros", "Directivos", "Investigaciones internas"],
      "boton": "Hablar con un especialista corporativo"
    }
  ]
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('final_cta', '{
  "titulo": "Tu defensa no puede esperar",
  "boton": "Contactar ahora"
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('imagenes', '{
  "hero_carousel": ["/IMG1.jpeg", "/IMG6.jpeg", "/IMG7.jpeg"],
  "servicios": {
    "personas": "/IMG1.jpeg",
    "empresas": "/IMG5.jpeg",
    "funcionarios": "/IMG2.jpeg",
    "mediaticos": "/IMG7.jpeg"
  },
  "galeria_nosotros": ["/IMG2.jpeg", "/IMG5.jpeg", "/IMG6.jpeg", "/IMG7.jpeg"]
}'::jsonb)
on conflict (clave) do nothing;
