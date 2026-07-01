-- IMPERIUM IURIS — Nuevas claves de configuración para inline editing (sesión 2026-07-01)
-- Ejecutar en el SQL Editor de Supabase.
--
-- Nota: agenda_page e imagenes NO necesitan SQL — sus campos nuevos
-- (horario_titulo, pasos, galeria_nosotros_titulo, etc.) se completan
-- automáticamente vía CONFIG_DEFAULTS en getSiteConfig() (lib/config.ts)
-- aunque la fila ya exista en la tabla con el JSON antiguo.

insert into public.configuracion (clave, valor) values
('testimonials_block', '{
  "titulo": "Reserva absoluta en cada caso",
  "subtitulo": "Testimonios anónimos de clientes que confiaron asuntos sensibles a la firma.",
  "testimonios": [
    { "texto": "Resolvieron un caso extremadamente delicado con absoluta reserva.", "autor": "Cliente confidencial" },
    { "texto": "Su estrategia evitó consecuencias irreparables para mi familia y mi empresa.", "autor": "Cliente confidencial" },
    { "texto": "Profesionalismo total. En el momento más crítico, su equipo respondió de inmediato.", "autor": "Cliente confidencial" }
  ]
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('footer', '{
  "descripcion": "Defensa penal estrategica para personas, empresas y funcionarios frente a escenarios juridicos complejos."
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('por_que_block', '{
  "titulo": "Defendemos lo que una investigación puede poner en riesgo",
  "subtitulo": "Un proceso penal no solo compromete la libertad. Puede afectar toda una vida institucional, familiar y patrimonial.",
  "items": ["Patrimonio", "Empresas", "Reputación", "Trayectoria profesional", "Estabilidad familiar"],
  "texto": "IMPERIUM IURIS nace para intervenir con precisión técnica antes de que una crisis jurídica genere daños irreversibles.",
  "closing": "Defendemos personas, empresas y futuros."
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('equipo_block', '{
  "titulo": "Casos complejos requieren múltiples especialistas",
  "subtitulo": "Nuestro modelo integra profesionales de distintas áreas para construir defensas más sólidas.",
  "especialistas": [
    "Abogados penalistas",
    "Constitucionalistas",
    "Expertos en compliance",
    "Auditores forenses",
    "Especialistas financieros",
    "Peritos tecnológicos",
    "Criminalistas",
    "Consultores reputacionales"
  ],
  "closing": "Una sola perspectiva nunca resuelve crisis complejas."
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('metodologia_block', '{
  "titulo": "Metodología de Trabajo",
  "subtitulo": "Cada etapa reduce incertidumbre y aumenta control.",
  "pasos": [
    { "titulo": "Diagnóstico inicial", "texto": "Identificamos riesgos inmediatos y evaluamos el escenario jurídico completo." },
    { "titulo": "Investigación estratégica", "texto": "Analizamos información crítica, precedentes y contexto probatorio." },
    { "titulo": "Diseño de defensa", "texto": "Construimos la ruta jurídica más efectiva para el caso específico." },
    { "titulo": "Ejecución legal", "texto": "Actuamos procesalmente con precisión técnica y agilidad estratégica." },
    { "titulo": "Protección integral", "texto": "Protegemos patrimonio, reputación y continuidad durante el proceso." },
    { "titulo": "Seguimiento permanente", "texto": "Acompañamiento continuo hasta la resolución definitiva del caso." }
  ]
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('confidencialidad_block', '{
  "titulo": "La discreción es parte de nuestra defensa",
  "subtitulo": "Aplicamos protocolos estrictos para proteger información crítica antes, durante y después del proceso.",
  "items": ["Documentación sensible", "Información financiera", "Datos corporativos", "Reputación personal", "Privacidad familiar"],
  "closing": "Lo que nos confía permanece protegido."
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('cta_nosotros', '{
  "titulo": "Cuando el riesgo aumenta, la improvisación desaparece",
  "subtitulo": "Converse con nuestro equipo y reciba una evaluación jurídica estratégica y confidencial.",
  "boton_primary": "Solicitar consulta confidencial",
  "boton_secondary": "Hablar con un especialista ahora"
}'::jsonb)
on conflict (clave) do nothing;

insert into public.configuracion (clave, valor) values
('contacto_page', '{
  "eyebrow": "Contacto",
  "titulo": "Consulta confidencial",
  "subtitulo": "Comparta la información esencial de su caso para activar una evaluación jurídica inicial."
}'::jsonb)
on conflict (clave) do nothing;
