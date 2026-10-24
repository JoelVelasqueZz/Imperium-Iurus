-- IMPERIUM IURIS — Carga inicial del catálogo de áreas de práctica y servicios
--
-- Word Abogados Asociados, sección 3 - 15 áreas de práctica y 150 servicios (10 servicios por área).
--
-- Solo la sección 3. No incluye autoridades, mecanismos
-- extrajudiciales, servicios notariales ni causas más demandadas.
-- descripcion_publica queda vacía (NULL) por ahora.
--
-- Requiere las tablas de catalogo_areas_servicios.sql, vacías.
-- Ejecuta el archivo COMPLETO, sin texto seleccionado.
-- Si ocurre un error ("current transaction is aborted"), ejecuta solo: ROLLBACK;

begin;

-- Verifica que las tablas existan y estén vacías antes de cargar.
do $$
begin
  if pg_catalog.to_regclass('public.areas_practica') is null
     or pg_catalog.to_regclass('public.servicios') is null then
    raise exception 'CARGA ABORTADA: faltan las tablas del catálogo. Aplica catalogo_areas_servicios.sql primero.';
  end if;

  if exists (select 1 from public.areas_practica)
     or exists (select 1 from public.servicios) then
    raise exception 'CARGA ABORTADA: areas_practica o servicios ya tienen datos.';
  end if;
end
$$;

-- 15 áreas de práctica.
insert into public.areas_practica (numero, slug, nombre, orden) values
  (1, 'civil-obligaciones-y-responsabilidad', 'Área civil, obligaciones y responsabilidad', 1),
  (2, 'inmobiliaria-posesion-y-propiedad', 'Área inmobiliaria, posesión y propiedad', 2),
  (3, 'familia-ninez-y-sucesiones', 'Área de familia, niñez y sucesiones', 3),
  (4, 'laboral-y-seguridad-social', 'Área laboral y seguridad social', 4),
  (5, 'penal-economica-y-penitenciaria', 'Área penal, económica y penitenciaria', 5),
  (6, 'transito-y-transporte', 'Área de tránsito y transporte', 6),
  (7, 'constitucional-derechos-humanos-y-justicia-intercultural', 'Área constitucional, derechos humanos y justicia intercultural', 7),
  (8, 'administrativa-disciplinaria-y-electoral', 'Área administrativa, disciplinaria y electoral', 8),
  (9, 'contratacion-publica-y-relaciones-con-el-estado', 'Área de contratación pública y relaciones con el Estado', 9),
  (10, 'tributaria-y-aduanera', 'Área tributaria y aduanera', 10),
  (11, 'societaria-mercantil-financiera-y-de-competencia', 'Área societaria, mercantil, financiera y de competencia', 11),
  (12, 'consumidores-banca-y-seguros', 'Área de consumidores, banca y seguros', 12),
  (13, 'propiedad-intelectual-tecnologia-y-datos', 'Área de propiedad intelectual, tecnología y datos', 13),
  (14, 'ambiental-agraria-recursos-naturales-y-sectores-productivos', 'Área ambiental, agraria, recursos naturales y sectores productivos', 14),
  (15, 'internacional-movilidad-humana-e-inversion', 'Área internacional, movilidad humana e inversión', 15);

-- 150 servicios. area_numero enlaza cada fila con su área.
insert into public.servicios
  (area_id, slug, numero, nombre, objeto_actuacion, servicio_ofrecido, orden)
select a.id, v.slug, v.numero, v.nombre, v.objeto_actuacion, v.servicio_ofrecido, v.numero
from (values
  -- 1. Área civil, obligaciones y responsabilidad
  (1, 'cobro-de-obligaciones', 1, 'Cobro de obligaciones', 'Obtener el pago de una deuda exigible o ejercer defensa frente a un cobro improcedente.', 'Revisar documentos, vencimiento y prescripción; liquidar valores; negociar y patrocinar el procedimiento adecuado, incluyendo su ejecución.'),
  (1, 'cumplimiento-contractual', 2, 'Cumplimiento contractual', 'Exigir que la contraparte ejecute la prestación válidamente asumida.', 'Interpretar el contrato, documentar el incumplimiento, formular requerimientos y preparar la demanda o defensa con prueba pertinente.'),
  (1, 'resolucion-de-contratos', 3, 'Resolución de contratos', 'Obtener la resolución del vínculo contractual por incumplimiento, con los efectos restitutorios y resarcitorios correspondientes.', 'Evaluar gravedad del incumplimiento, obligaciones recíprocas y restituciones; negociar la salida o ejercer patrocinio judicial.'),
  (1, 'nulidad-contractual', 4, 'Nulidad contractual', 'Cuestionar la validez del contrato por una causa legal de nulidad.', 'Identificar el vicio, legitimación y oportunidad; preparar la pretensión o defensa y analizar sus consecuencias patrimoniales.'),
  (1, 'indemnizacion-por-incumplimiento', 5, 'Indemnización por incumplimiento', 'Obtener reparación de perjuicios atribuibles al incumplimiento contractual.', 'Construir prueba del daño y causalidad; coordinar valoración económica y reclamar o controvertir los rubros solicitados.'),
  (1, 'responsabilidad-extracontractual', 6, 'Responsabilidad extracontractual', 'Reclamar reparación por daños ocasionados fuera de una relación contractual.', 'Determinar responsabilidad, preservar evidencia, cuantificar perjuicios y gestionar negociación, mediación o litigio.'),
  (1, 'dano-moral', 7, 'Daño moral', 'Solicitar reparación económica por una afectación extrapatrimonial jurídicamente relevante.', 'Evaluar procedencia, probar afectación y causalidad, sustentar la reparación y defender frente a reclamaciones infundadas.'),
  (1, 'rendicion-de-cuentas', 8, 'Rendición de cuentas', 'Exigir información y justificación de la administración de bienes o recursos ajenos.', 'Reconstruir operaciones, revisar soportes contables, solicitar cuentas y reclamar diferencias o responsabilidades acreditadas.'),
  (1, 'ejecucion-de-decisiones-y-acuerdos', 9, 'Ejecución de decisiones y acuerdos', 'Hacer efectivo lo ordenado en una decisión o instrumento con fuerza ejecutable.', 'Verificar el título, liquidar obligaciones, identificar bienes y promover medidas y actuaciones de ejecución procedentes.'),
  (1, 'insolvencia-de-personas-naturales', 10, 'Insolvencia de personas naturales', 'Tramitar o controvertir la insolvencia y el tratamiento colectivo de obligaciones conforme al régimen aplicable.', 'Analizar activos y deudas, representar al deudor o acreedor y evaluar acuerdos, impugnaciones y consecuencias patrimoniales.'),
  -- 2. Área inmobiliaria, posesión y propiedad
  (2, 'prescripcion-adquisitiva-de-dominio', 1, 'Prescripción adquisitiva de dominio', 'Obtener reconocimiento del dominio por una posesión que cumpla los requisitos legales.', 'Examinar antecedentes registrales, características y tiempo de posesión; identificar contradictores y preparar prueba documental, testimonial y técnica.'),
  (2, 'reivindicacion', 2, 'Reivindicación', 'Recuperar un bien frente a quien lo posee, acreditando el derecho de dominio.', 'Verificar titularidad e identidad del inmueble, estudiar la posesión contraria y patrocinar restitución o defensa.'),
  (2, 'acciones-posesorias', 3, 'Acciones posesorias', 'Conservar o recuperar la posesión frente a perturbaciones o despojo, según procedencia.', 'Determinar la acción y oportunidad, preservar evidencia del hecho y gestionar protección judicial de la posesión.'),
  (2, 'demarcacion-de-linderos', 4, 'Demarcación de linderos', 'Determinar o restablecer límites entre predios colindantes.', 'Revisar títulos y planos, coordinar levantamiento técnico y promover acuerdo o demanda con respaldo pericial.'),
  (2, 'servidumbres', 5, 'Servidumbres', 'Constituir, reconocer, modificar, defender o extinguir una servidumbre conforme a derecho.', 'Analizar títulos, utilidad y afectaciones; negociar condiciones y compensaciones o ejercer patrocinio especializado.'),
  (2, 'controversias-de-arrendamiento', 6, 'Controversias de arrendamiento', 'Resolver incumplimientos, cobros, terminación y restitución del inmueble.', 'Revisar contrato y régimen aplicable, documentar pagos o incumplimientos y gestionar negociación o defensa judicial.'),
  (2, 'propiedad-horizontal', 7, 'Propiedad horizontal', 'Resolver conflictos sobre bienes comunes, expensas, administración y obligaciones de copropietarios.', 'Revisar reglamentos y decisiones, asesorar administraciones y propietarios y tramitar cobros o impugnaciones admisibles.'),
  (2, 'compraventas-y-promesas', 8, 'Compraventas y promesas', 'Estructurar una adquisición segura o exigir los efectos de un negocio incumplido.', 'Realizar estudio de títulos, revisar gravámenes y facultades, redactar instrumentos y acompañar escritura e inscripción.'),
  (2, 'regularizacion-registral-y-catastral', 9, 'Regularización registral y catastral', 'Corregir inconsistencias y completar actuaciones necesarias para una adecuada identificación jurídica del inmueble.', 'Comparar registros, catastros y títulos; gestionar rectificaciones y determinar cuándo se necesita intervención judicial.'),
  (2, 'construccion-y-desarrollo-inmobiliario', 10, 'Construcción y desarrollo inmobiliario', 'Resolver controversias sobre obras, entregas, defectos, pagos y obligaciones del proyecto.', 'Revisar contratos, permisos y garantías; coordinar peritajes y reclamar cumplimiento, reparación o indemnización.'),
  -- 3. Área de familia, niñez y sucesiones
  (3, 'alimentos', 1, 'Alimentos', 'Fijar, modificar, liquidar, exigir o extinguir una obligación alimentaria cuando corresponda.', 'Analizar necesidades e ingresos, preparar prueba económica y gestionar acuerdos, incidentes y actuaciones de cumplimiento.'),
  (3, 'divorcio', 2, 'Divorcio', 'Obtener la disolución del matrimonio por causal o mutuo consentimiento.', 'Determinar la vía, preparar prueba o acuerdos y coordinar efectos familiares, patrimoniales y registrales.'),
  (3, 'union-de-hecho', 3, 'Unión de hecho', 'Formalizar, declarar, controvertir o terminar la unión y determinar sus efectos jurídicos.', 'Examinar presupuestos, reunir evidencia de convivencia y gestionar reconocimiento, terminación y cuestiones patrimoniales relacionadas.'),
  (3, 'tenencia-y-visitas', 4, 'Tenencia y visitas', 'Establecer o modificar cuidado y contacto familiar atendiendo al interés superior del niño.', 'Evaluar el contexto, proponer acuerdos admisibles, coordinar prueba especializada y gestionar medidas necesarias de protección.'),
  (3, 'filiacion-e-impugnacion-de-paternidad', 5, 'Filiación e impugnación de paternidad', 'Determinar o cuestionar un vínculo filial mediante la acción legal correspondiente.', 'Analizar legitimación y términos, gestionar prueba genética y documental y patrocinar con reserva y enfoque de derechos.'),
  (3, 'patria-potestad', 6, 'Patria potestad', 'Resolver controversias sobre su ejercicio, suspensión, privación o restitución, según procedencia.', 'Identificar hechos relevantes, preparar prueba y solicitar decisiones que protejan los derechos de la persona menor de edad.'),
  (3, 'tutela-curaduria-y-adopcion', 7, 'Tutela, curaduría y adopción', 'Obtener la protección o representación pertinente; en adopción, constituir legalmente el vínculo filial.', 'Diferenciar cada régimen, preparar documentación y acompañar las etapas administrativas y judiciales aplicables.'),
  (3, 'liquidacion-de-sociedad-conyugal-o-de-bienes', 8, 'Liquidación de sociedad conyugal o de bienes', 'Determinar activos, pasivos y adjudicaciones del patrimonio común.', 'Reconstruir el patrimonio, revisar deudas, coordinar avalúos y formalizar acuerdo o promover liquidación controvertida.'),
  (3, 'inventario-y-particion-sucesoria', 9, 'Inventario y partición sucesoria', 'Identificar el patrimonio hereditario y distribuirlo entre quienes tengan derecho.', 'Verificar herederos, activos y pasivos; coordinar avalúos, acuerdos, adjudicaciones e inscripciones.'),
  (3, 'testamentos-y-controversias-hereditarias', 10, 'Testamentos y controversias hereditarias', 'Organizar la sucesión o reclamar y defender derechos sobre una herencia.', 'Asesorar planificación sucesoria, revisar validez testamentaria y patrocinar petición de herencia o impugnaciones procedentes.'),
  -- 4. Área laboral y seguridad social
  (4, 'remuneraciones-y-beneficios', 1, 'Remuneraciones y beneficios', 'Obtener pago o determinar correctamente valores derivados de la relación laboral.', 'Auditar roles, jornadas y pagos; calcular diferencias y gestionar reclamación, acuerdo o defensa.'),
  (4, 'despido-intempestivo', 2, 'Despido intempestivo', 'Reclamar o controvertir indemnizaciones por terminación unilateral de la relación laboral.', 'Reconstruir la terminación, evaluar prueba y liquidación y representar al cliente en negociación o juicio.'),
  (4, 'despido-ineficaz', 3, 'Despido ineficaz', 'Obtener la tutela prevista para las categorías legalmente protegidas frente al despido.', 'Verificar protección aplicable y oportunidad, documentar el despido y solicitar las consecuencias jurídicas pertinentes.'),
  (4, 'visto-bueno', 4, 'Visto bueno', 'Solicitar o controvertir la terminación laboral por una causal legal.', 'Evaluar la causal, reunir prueba y patrocinar el trámite administrativo y las actuaciones judiciales relacionadas.'),
  (4, 'jubilacion-patronal', 5, 'Jubilación patronal', 'Reconocer, calcular y exigir la prestación cuando se cumplan sus presupuestos.', 'Revisar historia laboral, coordinar cálculo técnico y asesorar pagos, acuerdos admisibles o reclamaciones.'),
  (4, 'utilidades', 6, 'Utilidades', 'Determinar y reclamar la participación laboral que corresponda.', 'Revisar tiempo trabajado y bases económicas; coordinar análisis contable y ejercer reclamación o defensa.'),
  (4, 'acoso-y-discriminacion-laboral', 7, 'Acoso y discriminación laboral', 'Obtener protección o resolver denuncias por conductas lesivas en el trabajo.', 'Preservar evidencia, asesorar investigaciones imparciales, activar vías pertinentes y prevenir represalias.'),
  (4, 'accidentes-y-enfermedades-profesionales', 8, 'Accidentes y enfermedades profesionales', 'Determinar protección, prestaciones y responsabilidades vinculadas con riesgos del trabajo.', 'Coordinar evidencia médica y ocupacional, gestionar trámites y analizar responsabilidades del empleador o terceros.'),
  (4, 'afiliacion-aportes-y-prestaciones-del-iess', 9, 'Afiliación, aportes y prestaciones del IESS', 'Corregir incumplimientos y acceder a prestaciones legalmente reconocidas.', 'Auditar historia de aportes, preparar solicitudes o impugnaciones y representar en actuaciones administrativas o judiciales.'),
  (4, 'contratacion-reglamentos-y-conflictos-colectivos', 10, 'Contratación, reglamentos y conflictos colectivos', 'Organizar relaciones laborales y resolver controversias colectivas conforme al régimen aplicable.', 'Redactar contratos y políticas, revisar reglamentos y acompañar negociación colectiva y procedimientos de conflicto.'),
  -- 5. Área penal, económica y penitenciaria
  (5, 'flagrancia-y-defensa-inicial', 1, 'Flagrancia y defensa inicial', 'Proteger garantías desde la aprehensión y enfrentar las primeras decisiones procesales.', 'Intervenir oportunamente, revisar legalidad de la actuación, asistir al detenido y preparar defensa frente a cargos y medidas.'),
  (5, 'delitos-patrimoniales', 2, 'Delitos patrimoniales', 'Defender o representar en investigaciones por apropiación, sustracción o afectación fraudulenta del patrimonio.', 'Analizar elementos del delito y evidencia; gestionar reparación o recuperación de bienes y conciliación admisible.'),
  (5, 'delitos-contra-la-integridad-personal', 3, 'Delitos contra la integridad personal', 'Ejercer defensa o representación ante hechos que afectan la integridad física o psicológica.', 'Coordinar prueba médica y pericial, reconstruir hechos y controvertir responsabilidad, gravedad y reparación.'),
  (5, 'violencia-y-delitos-sexuales', 4, 'Violencia y delitos sexuales', 'Obtener protección y representación de víctimas o ejercer defensa técnica especializada.', 'Aplicar protocolos de atención y reserva, analizar evidencia y prevenir revictimización durante las actuaciones.'),
  (5, 'delitos-informaticos', 5, 'Delitos informáticos', 'Investigar jurídicamente y defender frente a hechos cometidos mediante sistemas o datos.', 'Coordinar preservación de evidencia digital, peritaje tecnológico y análisis de atribución y autenticidad.'),
  (5, 'lavado-de-activos', 6, 'Lavado de activos', 'Defender frente a imputaciones de ocultamiento o legitimación de activos de origen ilícito.', 'Reconstruir operaciones y trazabilidad, coordinar auditoría forense y controvertir imputación y medidas patrimoniales.'),
  (5, 'delitos-contra-la-administracion-publica', 7, 'Delitos contra la administración pública', 'Ejercer defensa o representación en investigaciones sobre uso ilícito de funciones o recursos públicos.', 'Analizar contratación, competencias y flujo de recursos; integrar prueba administrativa, contable y penal.'),
  (5, 'criminalidad-empresarial-y-personas-juridicas', 8, 'Criminalidad empresarial y personas jurídicas', 'Prevenir y enfrentar responsabilidades penales derivadas de la actividad empresarial.', 'Implementar cumplimiento penal, realizar investigaciones internas y preparar defensa de compañía y personas, controlando conflictos.'),
  (5, 'recursos-y-revision', 9, 'Recursos y revisión', 'Cuestionar decisiones mediante los mecanismos legalmente disponibles.', 'Auditar el expediente, identificar causales y agravios y preparar sustentación técnica ante el órgano competente.'),
  (5, 'ejecucion-de-penas-y-garantias-penitenciarias', 10, 'Ejecución de penas y garantías penitenciarias', 'Proteger derechos durante el cumplimiento de la pena y solicitar modificaciones legalmente admisibles.', 'Revisar cómputos, condiciones de detención y requisitos; tramitar solicitudes y garantías procedentes.'),
  -- 6. Área de tránsito y transporte
  (6, 'impugnacion-de-citaciones', 1, 'Impugnación de citaciones', 'Cuestionar una citación por infracción de tránsito cuando existan fundamentos legales.', 'Revisar notificación, hechos y evidencia técnica y presentar oportunamente la impugnación pertinente.'),
  (6, 'conduccion-bajo-efectos-del-alcohol', 2, 'Conducción bajo efectos del alcohol', 'Ejercer defensa frente a la imputación y sus consecuencias.', 'Revisar procedimiento, pruebas y garantías, asistir a audiencias y analizar impugnaciones admisibles.'),
  (6, 'accidentes-con-danos-materiales', 3, 'Accidentes con daños materiales', 'Determinar responsabilidad y obtener reparación de daños en bienes.', 'Reconstruir el accidente, coordinar peritaje y gestionar acuerdo, seguro o reclamación correspondiente.'),
  (6, 'lesiones-y-muerte-culposa', 4, 'Lesiones y muerte culposa', 'Defender o representar en investigaciones por resultados lesivos de un accidente.', 'Integrar prueba técnica y médica, examinar causalidad y preparar estrategia penal y de reparación.'),
  (6, 'reparacion-e-indemnizaciones', 5, 'Reparación e indemnizaciones', 'Obtener compensación por perjuicios derivados del accidente o controvertir su cuantía.', 'Documentar daños, coordinar valoración económica y reclamar frente a responsables o aseguradores según corresponda.'),
  (6, 'devolucion-de-vehiculos-retenidos', 6, 'Devolución de vehículos retenidos', 'Solicitar entrega del vehículo cuando no exista fundamento para mantener la retención.', 'Identificar autoridad y motivo, acreditar derechos y promover levantamiento o impugnación de la medida.'),
  (6, 'permisos-y-titulos-de-transporte', 7, 'Permisos y títulos de transporte', 'Obtener, renovar, modificar o defender habilitaciones para operar.', 'Auditar requisitos y expedientes, preparar solicitudes y patrocinar actuaciones ante la autoridad competente.'),
  (6, 'sanciones-a-operadores', 8, 'Sanciones a operadores', 'Controvertir sanciones que afectan la operación del transportista.', 'Examinar competencia, procedimiento y prueba; preparar descargos y evaluar recursos o acciones.'),
  (6, 'contratos-de-transporte-y-logistica', 9, 'Contratos de transporte y logística', 'Regular traslado, custodia, entrega, riesgos y responsabilidades de mercancías o pasajeros.', 'Redactar contratos, revisar garantías y seguros y gestionar reclamaciones por pérdida, retraso o incumplimiento.'),
  (6, 'asuntos-maritimos-portuarios-y-aeronauticos', 10, 'Asuntos marítimos, portuarios y aeronáuticos', 'Resolver obligaciones y riesgos de operaciones sujetas a regímenes especializados.', 'Incorporar al especialista sectorial, revisar habilitaciones y contratos y coordinar reclamaciones y defensa regulatoria.'),
  -- 7. Área constitucional, derechos humanos y justicia intercultural
  (7, 'accion-de-proteccion', 1, 'Acción de protección', 'Obtener tutela y reparación frente a vulneraciones comprendidas en esta garantía.', 'Identificar derechos y actos lesivos, evaluar procedencia y preparar prueba y reparación solicitada.'),
  (7, 'habeas-corpus', 2, 'Hábeas corpus', 'Proteger libertad y derechos relacionados con una privación de libertad en los supuestos constitucionales.', 'Analizar detención y condiciones, reunir evidencia urgente y patrocinar la garantía correspondiente.'),
  (7, 'habeas-data', 3, 'Hábeas data', 'Proteger el conocimiento y control de información personal mediante la garantía aplicable.', 'Documentar el tratamiento cuestionado y formular solicitudes y pretensiones de acceso, rectificación u otras procedentes.'),
  (7, 'acceso-a-informacion-publica', 4, 'Acceso a información pública', 'Obtener información pública indebidamente negada o entregada de forma insuficiente.', 'Preparar solicitudes, analizar reservas y documentar la negativa para activar la garantía cuando corresponda.'),
  (7, 'medidas-cautelares-constitucionales', 5, 'Medidas cautelares constitucionales', 'Evitar o hacer cesar amenazas o vulneraciones de derechos bajo sus presupuestos.', 'Identificar urgencia y afectación, diseñar medidas concretas y preparar solicitud y seguimiento.'),
  (7, 'accion-extraordinaria-de-proteccion', 6, 'Acción extraordinaria de protección', 'Cuestionar vulneraciones constitucionales atribuibles a decisiones judiciales susceptibles de esta acción.', 'Auditar requisitos, agotamiento y oportunidad; formular cargos constitucionales y gestionar el procedimiento.'),
  (7, 'ejecucion-de-reparaciones-constitucionales', 7, 'Ejecución de reparaciones constitucionales', 'Obtener cumplimiento efectivo de las medidas ordenadas.', 'Convertir la decisión en obligaciones verificables, documentar incumplimientos y activar mecanismos de ejecución.'),
  (7, 'accion-por-incumplimiento-y-accion-de-incumplimiento', 8, 'Acción por incumplimiento y acción de incumplimiento', 'Exigir obligaciones normativas o cumplimiento de decisiones constitucionales, según el mecanismo correspondiente.', 'Distinguir ambas acciones, verificar presupuestos y preparar la actuación ante el órgano competente.'),
  (7, 'sistema-interamericano', 9, 'Sistema interamericano', 'Presentar peticiones y solicitudes de protección internacional admisibles.', 'Evaluar competencia, agotamiento o excepciones, plazos y prueba; acompañar el trámite y eventual representación posterior.'),
  (7, 'justicia-indigena-y-derechos-colectivos', 10, 'Justicia indígena y derechos colectivos', 'Proteger derechos colectivos y atender coordinación o conflictos entre jurisdicciones.', 'Aplicar análisis intercultural, trabajar con especialistas pertinentes y respetar competencias, procedimientos y control constitucional.'),
  -- 8. Área administrativa, disciplinaria y electoral
  (8, 'impugnacion-de-actos-administrativos', 1, 'Impugnación de actos administrativos', 'Obtener revisión o anulación de actos que afecten derechos, conforme a la vía disponible.', 'Analizar competencia, motivación y procedimiento; determinar recurso o acción y preparar defensa.'),
  (8, 'procedimientos-sancionadores', 2, 'Procedimientos sancionadores', 'Controvertir la imputación o las consecuencias de una infracción administrativa.', 'Acceder al expediente, presentar descargos y prueba y cuestionar tipicidad, responsabilidad y proporcionalidad.'),
  (8, 'sumarios-de-servidores-publicos', 3, 'Sumarios de servidores públicos', 'Defender frente a imputaciones disciplinarias y sus posibles sanciones.', 'Examinar causal y régimen, preparar defensa probatoria y gestionar recursos o acciones pertinentes.'),
  (8, 'disciplina-policial-y-regimenes-especiales', 4, 'Disciplina policial y regímenes especiales', 'Proteger garantías en procedimientos sujetos a normas disciplinarias específicas.', 'Revisar actuaciones, imparcialidad y prueba; patrocinar audiencias e impugnaciones con el especialista correspondiente.'),
  (8, 'responsabilidad-patrimonial-estatal', 5, 'Responsabilidad patrimonial estatal', 'Obtener reparación por daños atribuibles a actuaciones u omisiones estatales jurídicamente relevantes.', 'Identificar imputación y causalidad, cuantificar daños y tramitar reclamación o demanda procedente.'),
  (8, 'coactiva-no-tributaria', 6, 'Coactiva no tributaria', 'Controvertir la ejecución o gestionar una solución legal de la obligación.', 'Revisar título, notificaciones y medidas; evaluar excepciones, facilidades y solicitudes de levantamiento.'),
  (8, 'permisos-y-autorizaciones', 7, 'Permisos y autorizaciones', 'Obtener o defender habilitaciones necesarias para una actividad.', 'Preparar expedientes, responder observaciones y cuestionar negativas, revocaciones o restricciones procedentes.'),
  (8, 'glosas-y-responsabilidades-administrativas', 8, 'Glosas y responsabilidades administrativas', 'Controvertir hallazgos y determinaciones de responsabilidad de órganos de control.', 'Reconstruir actuaciones, coordinar análisis técnico y contable y preparar descargos e impugnaciones.'),
  (8, 'controversias-educativas-y-universitarias', 9, 'Controversias educativas y universitarias', 'Defender derechos en admisión, evaluación, disciplina, concursos y relaciones institucionales.', 'Revisar normativa interna y nacional, documentar actuaciones y gestionar reclamaciones y vías pertinentes.'),
  (8, 'impugnaciones-e-infracciones-electorales', 10, 'Impugnaciones e infracciones electorales', 'Cuestionar decisiones electorales o ejercer defensa ante imputaciones del régimen electoral.', 'Activar el especialista, controlar términos y preparar prueba y patrocinio ante CNE o TCE según competencia.'),
  -- 9. Área de contratación pública y relaciones con el Estado
  (9, 'habilitacion-de-proveedores', 1, 'Habilitación de proveedores', 'Obtener y mantener las condiciones necesarias para participar en contratación pública.', 'Revisar registros, documentación e inhabilidades y acompañar regularización y actualización.'),
  (9, 'revision-de-pliegos', 2, 'Revisión de pliegos', 'Evaluar condiciones jurídicas de participación y obligaciones del eventual contrato.', 'Identificar riesgos, inconsistencias y requisitos; preparar consultas y asesorar la decisión de participar.'),
  (9, 'impugnaciones-admisibles', 3, 'Impugnaciones admisibles', 'Cuestionar actuaciones de contratación mediante los mecanismos disponibles.', 'Determinar legitimación, competencia y oportunidad y presentar la reclamación o acción pertinente.'),
  (9, 'ejecucion-contractual', 4, 'Ejecución contractual', 'Asegurar cumplimiento y adecuada documentación de obligaciones recíprocas.', 'Revisar cronogramas, comunicaciones y modificaciones y acompañar gestión de incidentes contractuales.'),
  (9, 'multas', 5, 'Multas', 'Controvertir o determinar correctamente penalidades contractuales.', 'Analizar imputabilidad, cálculo y procedimiento; preparar descargos y revisar vías de impugnación.'),
  (9, 'terminacion-unilateral', 6, 'Terminación unilateral', 'Cuestionar la decisión o gestionar sus efectos jurídicos y económicos.', 'Auditar expediente y causales, preparar defensa y analizar medidas o acciones legalmente disponibles.'),
  (9, 'ejecucion-de-garantias', 7, 'Ejecución de garantías', 'Examinar procedencia, alcance y efectos de una ejecución de garantía.', 'Revisar instrumento, requerimiento y obligaciones; coordinar actuación con contratista, garante y autoridad competente.'),
  (9, 'planillas-y-liquidaciones', 8, 'Planillas y liquidaciones', 'Obtener pagos y reconocer diferencias económicas derivadas de la ejecución.', 'Organizar soportes de cumplimiento, calcular valores y gestionar reclamación, acuerdo o litigio.'),
  (9, 'concesiones-y-asociaciones', 9, 'Concesiones y asociaciones', 'Estructurar o resolver relaciones de colaboración contractual con el Estado.', 'Evaluar distribución de riesgos, obligaciones e inversión y asesorar negociación, ejecución y controversias.'),
  (9, 'mediacion-arbitraje-o-litigio-publico', 10, 'Mediación, arbitraje o litigio público', 'Resolver controversias contractuales mediante la vía jurídicamente habilitada.', 'Examinar cláusulas, arbitrabilidad y autorizaciones; preparar estrategia, prueba y representación especializada.'),
  -- 10. Área tributaria y aduanera
  (10, 'determinaciones-tributarias', 1, 'Determinaciones tributarias', 'Controvertir o verificar obligaciones determinadas por la administración.', 'Auditar hechos y cálculo, revisar documentación y preparar respuesta técnica con apoyo contable.'),
  (10, 'reclamos-administrativos', 2, 'Reclamos administrativos', 'Obtener revisión de actos tributarios que afecten derechos.', 'Determinar admisibilidad y oportunidad, formular fundamentos y acompañar prueba y seguimiento.'),
  (10, 'devoluciones-y-pagos-indebidos', 3, 'Devoluciones y pagos indebidos', 'Recuperar valores que legalmente deban devolverse al contribuyente.', 'Identificar fundamento, reconstruir pagos y preparar solicitud, reclamación o impugnación.'),
  (10, 'sanciones-tributarias', 4, 'Sanciones tributarias', 'Controvertir la infracción, responsabilidad o cuantía de la sanción.', 'Analizar conducta y procedimiento, formular descargos y promover la defensa correspondiente.'),
  (10, 'recursos-especiales-admisibles', 5, 'Recursos especiales admisibles', 'Obtener revisión extraordinaria cuando concurra una causal del régimen tributario.', 'Verificar causal y requisitos y preparar el recurso con evidencia específica.'),
  (10, 'impugnacion-contencioso-tributaria', 6, 'Impugnación contencioso-tributaria', 'Someter a control judicial una controversia tributaria comprendida en la competencia del tribunal.', 'Diseñar pretensiones, integrar prueba contable y jurídica y patrocinar hasta la decisión y ejecución.'),
  (10, 'coactiva-tributaria', 7, 'Coactiva tributaria', 'Controvertir la ejecución o gestionar opciones legales de pago y protección patrimonial.', 'Revisar deuda y medidas, evaluar excepciones y facilidades y solicitar actuaciones procedentes.'),
  (10, 'transaccion-tributaria', 8, 'Transacción tributaria', 'Alcanzar un acuerdo dentro del ámbito legalmente transigible.', 'Evaluar elegibilidad, exclusiones y efectos; preparar propuesta y representar al cliente en el procedimiento.'),
  (10, 'clasificacion-valoracion-y-origen-aduanero', 9, 'Clasificación, valoración y origen aduanero', 'Resolver controversias que afectan tratamiento y liquidación de mercancías.', 'Coordinar evidencia comercial y técnica y preparar defensa administrativa o judicial.'),
  (10, 'responsabilidades-tributarias-y-aduaneras', 10, 'Responsabilidades tributarias y aduaneras', 'Enfrentar imputaciones administrativas o penales relacionadas con operaciones fiscales y comerciales.', 'Separar regímenes de responsabilidad, preservar documentación y coordinar defensa tributaria, aduanera y penal.'),
  -- 11. Área societaria, mercantil, financiera y de competencia
  (11, 'constitucion-y-reorganizacion-de-companias', 1, 'Constitución y reorganización de compañías', 'Crear o adaptar la estructura societaria a las necesidades del negocio.', 'Seleccionar forma jurídica, redactar estatutos y acompañar registros, reformas y obligaciones iniciales.'),
  (11, 'acuerdos-entre-socios', 2, 'Acuerdos entre socios', 'Regular gobierno, aportes, distribución económica, transferencias y solución de conflictos.', 'Diseñar pactos, revisar su eficacia y establecer mecanismos de decisión, salida y prevención de bloqueos.'),
  (11, 'impugnacion-de-decisiones-societarias', 3, 'Impugnación de decisiones societarias', 'Cuestionar decisiones contrarias a normas, estatutos o derechos protegidos.', 'Revisar convocatoria, deliberación y acuerdos; preservar evidencia y patrocinar la vía procedente.'),
  (11, 'responsabilidad-de-administradores', 4, 'Responsabilidad de administradores', 'Determinar o controvertir responsabilidad por actuaciones de gestión.', 'Analizar deberes, decisiones y daños y preparar reclamación, defensa y medidas de gobierno corporativo.'),
  (11, 'fusiones-y-adquisiciones', 5, 'Fusiones y adquisiciones', 'Estructurar integración o compra empresarial con adecuada asignación de riesgos.', 'Realizar revisión jurídica, negociar documentos y coordinar autorizaciones y cierre de la operación.'),
  (11, 'contratos-mercantiles', 6, 'Contratos mercantiles', 'Regular relaciones de suministro, distribución, agencia y otras operaciones comerciales.', 'Redactar y revisar contratos, garantías y cláusulas de controversia; acompañar negociación y cumplimiento.'),
  (11, 'fideicomisos-y-financiamiento', 7, 'Fideicomisos y financiamiento', 'Estructurar administración patrimonial, garantías y obtención de recursos.', 'Revisar instrumentos, obligaciones y regulación y coordinar con fiduciarias, financiadores y especialistas.'),
  (11, 'mercado-de-valores', 8, 'Mercado de valores', 'Cumplir requisitos de operaciones y participantes o defender derechos relacionados.', 'Asesorar documentación, información y obligaciones regulatorias y gestionar controversias especializadas.'),
  (11, 'reestructuracion-disolucion-y-liquidacion', 9, 'Reestructuración, disolución y liquidación', 'Reorganizar pasivos o concluir la actividad societaria conforme al régimen aplicable.', 'Evaluar viabilidad, negociar con acreedores y gestionar actos corporativos, liquidación y responsabilidades.'),
  (11, 'competencia-economica-y-desleal', 10, 'Competencia económica y desleal', 'Prevenir o defender prácticas cuestionadas y gestionar concentraciones sujetas a control.', 'Evaluar riesgos, preparar notificaciones y defensa y distinguir el régimen aplicable a cada conducta.'),
  -- 12. Área de consumidores, banca y seguros
  (12, 'cobros-indebidos', 1, 'Cobros indebidos', 'Obtener corrección y restitución de valores cobrados sin fundamento.', 'Revisar contrato, estados y comprobantes y gestionar reclamo y actuaciones posteriores procedentes.'),
  (12, 'operaciones-financieras-no-reconocidas', 2, 'Operaciones financieras no reconocidas', 'Controvertir transacciones desconocidas y determinar responsabilidades.', 'Preservar evidencia, reconstruir comunicaciones y coordinar reclamo financiero y análisis tecnológico o penal.'),
  (12, 'incumplimiento-de-proveedores', 3, 'Incumplimiento de proveedores', 'Obtener entrega, cumplimiento, devolución o reparación según el caso.', 'Revisar oferta y contrato, documentar incumplimiento y gestionar negociación o reclamación.'),
  (12, 'garantias-de-productos', 4, 'Garantías de productos', 'Exigir las prestaciones derivadas de la garantía aplicable.', 'Revisar condiciones, documentar defectos y reclamar reparación, sustitución u otra solución procedente.'),
  (12, 'clausulas-abusivas', 5, 'Cláusulas abusivas', 'Cuestionar estipulaciones lesivas dentro del régimen de protección correspondiente.', 'Analizar contrato, efectos y desequilibrio y determinar la vía para controvertir la cláusula.'),
  (12, 'reclamos-financieros', 6, 'Reclamos financieros', 'Obtener revisión de actuaciones ante entidad, defensor del cliente o supervisor competente.', 'Organizar expediente, formular el reclamo y controlar respuestas y opciones posteriores.'),
  (12, 'objecion-de-cobertura', 7, 'Objeción de cobertura', 'Controvertir rechazo de un siniestro o alcance de la cobertura.', 'Interpretar póliza y exclusiones, revisar aviso y prueba y gestionar reclamo o defensa.'),
  (12, 'indemnizaciones-de-seguros', 8, 'Indemnizaciones de seguros', 'Obtener el pago debido o resolver diferencias sobre su cuantía.', 'Documentar siniestro y pérdida, coordinar valoración y reclamar frente a la aseguradora.'),
  (12, 'salud-prepagada', 9, 'Salud prepagada', 'Resolver controversias sobre prestaciones, autorizaciones y condiciones contractuales.', 'Revisar plan y negativa, preservar información médica y activar canales pertinentes con atención a la urgencia.'),
  (12, 'responsabilidad-por-productos-o-servicios', 10, 'Responsabilidad por productos o servicios', 'Obtener reparación por daños causados o controvertir la responsabilidad reclamada.', 'Identificar responsables, coordinar prueba técnica y médica y preparar reclamación o defensa.'),
  -- 13. Área de propiedad intelectual, tecnología y datos
  (13, 'registro-de-marcas', 1, 'Registro de marcas', 'Obtener protección registral de un signo distintivo.', 'Realizar búsqueda y análisis de registrabilidad, definir cobertura y gestionar solicitud y observaciones.'),
  (13, 'oposiciones-y-cancelaciones', 2, 'Oposiciones y cancelaciones', 'Controvertir solicitudes o registros mediante los mecanismos legalmente previstos.', 'Evaluar fundamento y oportunidad, reunir evidencia y patrocinar el procedimiento ante SENADI.'),
  (13, 'infracciones-de-propiedad-industrial', 3, 'Infracciones de propiedad industrial', 'Hacer cesar usos lesivos de derechos o defender frente a la imputación.', 'Examinar titularidad y alcance, preservar evidencia y gestionar requerimientos y acciones pertinentes.'),
  (13, 'derechos-de-autor-y-software', 4, 'Derechos de autor y software', 'Proteger autoría, titularidad, explotación y uso autorizado de obras y programas.', 'Revisar cadena de derechos, redactar cesiones y licencias y gestionar controversias por utilización indebida.'),
  (13, 'licencias-y-transferencia-tecnologica', 5, 'Licencias y transferencia tecnológica', 'Regular uso, explotación y transferencia de conocimientos o activos tecnológicos.', 'Definir derechos, exclusividad, contraprestaciones, confidencialidad y mecanismos de terminación y solución de conflictos.'),
  (13, 'comercio-electronico', 6, 'Comercio electrónico', 'Organizar relaciones comerciales digitales y atender conflictos de contratación.', 'Revisar términos, información al consumidor y mecanismos de aceptación, pagos, devoluciones y prueba.'),
  (13, 'contratos-tecnologicos', 7, 'Contratos tecnológicos', 'Regular desarrollo, soporte, alojamiento, servicios en la nube y otras prestaciones tecnológicas.', 'Definir entregables, niveles de servicio, propiedad, seguridad, responsabilidad y salida contractual.'),
  (13, 'derechos-sobre-datos-personales', 8, 'Derechos sobre datos personales', 'Ejercer derechos del titular frente al tratamiento de su información.', 'Analizar solicitud y base jurídica, gestionar respuesta y activar reclamación o garantía pertinente.'),
  (13, 'cumplimiento-y-defensa-ante-la-spdp', 9, 'Cumplimiento y defensa ante la SPDP', 'Adecuar tratamientos y enfrentar denuncias, inspecciones o sanciones.', 'Auditar riesgos y documentación, diseñar controles y preparar defensa administrativa especializada.'),
  (13, 'ciberseguridad-ia-y-telecomunicaciones', 10, 'Ciberseguridad, IA y telecomunicaciones', 'Gestionar riesgos jurídicos de incidentes, sistemas de IA y servicios regulados.', 'Coordinar respuesta técnica y legal, revisar obligaciones y contratos y acompañar actuaciones regulatorias.'),
  -- 14. Área ambiental, agraria, recursos naturales y sectores productivos
  (14, 'permisos-y-regularizacion-ambiental', 1, 'Permisos y regularización ambiental', 'Obtener o actualizar habilitaciones ambientales requeridas para una actividad.', 'Determinar obligaciones, coordinar estudios con técnicos habilitados y acompañar expediente y cumplimiento.'),
  (14, 'procedimientos-sancionadores-ambientales', 2, 'Procedimientos sancionadores ambientales', 'Controvertir infracciones o atender obligaciones correctivas jurídicamente exigibles.', 'Examinar expediente y prueba técnica, formular descargos y gestionar medidas y vías de defensa.'),
  (14, 'reparacion-ambiental-y-naturaleza', 3, 'Reparación ambiental y naturaleza', 'Obtener protección y restauración frente a afectaciones o defender responsabilidades atribuidas.', 'Coordinar evaluación del daño, analizar causalidad y preparar actuaciones administrativas, judiciales o constitucionales pertinentes.'),
  (14, 'tierras-rurales-y-conflictos-agrarios', 4, 'Tierras rurales y conflictos agrarios', 'Resolver controversias sobre titularidad, regularización y aprovechamiento de tierras.', 'Estudiar antecedentes y régimen agrario, coordinar prueba territorial y gestionar solicitudes o litigio.'),
  (14, 'uso-y-aprovechamiento-del-agua', 5, 'Uso y aprovechamiento del agua', 'Obtener o defender autorizaciones y resolver conflictos sobre su ejercicio.', 'Revisar títulos y condiciones, coordinar respaldo técnico y patrocinar actuaciones ante la autoridad competente.'),
  (14, 'mineria', 6, 'Minería', 'Organizar y defender derechos y obligaciones de actividades mineras.', 'Revisar títulos, contratos, habilitaciones y contingencias y gestionar defensa sectorial con especialistas técnicos.'),
  (14, 'hidrocarburos-y-energia', 7, 'Hidrocarburos y energía', 'Estructurar o resolver obligaciones de proyectos y operaciones del sector.', 'Evaluar contratos, autorizaciones y riesgos y acompañar negociación, cumplimiento y controversias.'),
  (14, 'acuacultura-y-pesca', 8, 'Acuacultura y pesca', 'Obtener y defender habilitaciones y resolver conflictos de operación.', 'Revisar permisos y obligaciones, asesorar contratos y gestionar descargos e impugnaciones.'),
  (14, 'regulacion-sanitaria-y-agropecuaria', 9, 'Regulación sanitaria y agropecuaria', 'Cumplir requisitos y defender actividades frente a controles y sanciones.', 'Auditar registros y permisos, preparar regularización y coordinar defensa jurídica y técnica.'),
  (14, 'contratos-y-cumplimiento-productivo', 10, 'Contratos y cumplimiento productivo', 'Regular relaciones y reducir contingencias de cadenas productivas.', 'Diseñar contratos, matrices de obligaciones y protocolos de seguimiento y gestionar controversias comerciales o regulatorias.'),
  -- 15. Área internacional, movilidad humana e inversión
  (15, 'visas-y-residencia', 1, 'Visas y residencia', 'Obtener, renovar o modificar una condición migratoria conforme a la categoría aplicable.', 'Evaluar elegibilidad, preparar documentos y acompañar solicitud, observaciones y actuaciones posteriores.'),
  (15, 'naturalizacion', 2, 'Naturalización', 'Obtener reconocimiento de nacionalidad por la vía legal correspondiente.', 'Examinar requisitos, organizar expediente y gestionar el procedimiento y respuestas a observaciones.'),
  (15, 'refugio-y-proteccion-internacional', 3, 'Refugio y protección internacional', 'Solicitar protección frente a riesgos comprendidos en el régimen aplicable.', 'Preparar relato y evidencia con reserva, acompañar entrevistas y gestionar impugnaciones admisibles.'),
  (15, 'actuaciones-migratorias', 4, 'Actuaciones migratorias', 'Defender derechos frente a decisiones que afectan ingreso, permanencia o salida.', 'Revisar acto y garantías, reunir prueba y activar recursos o mecanismos de protección pertinentes.'),
  (15, 'contratos-internacionales', 5, 'Contratos internacionales', 'Regular obligaciones entre partes o prestaciones vinculadas con distintas jurisdicciones.', 'Definir ley, foro, moneda, riesgos y garantías y coordinar revisión con abogados extranjeros cuando sea necesario.'),
  (15, 'inversion-extranjera', 6, 'Inversión extranjera', 'Estructurar una inversión y proteger sus derechos dentro del marco aplicable.', 'Realizar revisión jurídica, organizar vehículos y contratos y analizar permisos, tributación y protección disponible.'),
  (15, 'decisiones-extranjeras', 7, 'Decisiones extranjeras', 'Obtener reconocimiento o ejecución en Ecuador conforme al régimen correspondiente.', 'Examinar requisitos y documentos y distinguir el tratamiento de sentencias, acuerdos y laudos extranjeros.'),
  (15, 'arbitraje-internacional', 8, 'Arbitraje internacional', 'Resolver controversias sometidas válidamente a arbitraje con elemento internacional.', 'Evaluar convenio y reglas, coordinar equipo y peritos y preparar defensa, reclamación y ejecución procedente.'),
  (15, 'restitucion-internacional-de-menores', 9, 'Restitución internacional de menores', 'Solicitar retorno o controvertirlo bajo el instrumento y presupuestos aplicables.', 'Analizar traslado o retención, verificar vigencia bilateral y coordinar autoridades y especialistas de ambos países.'),
  (15, 'cooperacion-y-extradicion', 10, 'Cooperación y extradición', 'Atender asistencia jurídica internacional o ejercer defensa en solicitudes de extradición.', 'Examinar tratado y procedimiento, coordinar defensa penal e internacional y proteger garantías del representado.')
) as v (area_numero, slug, numero, nombre, objeto_actuacion, servicio_ofrecido)
join public.areas_practica a on a.numero = v.area_numero;

-- Comprueba el resultado: 15 áreas, 150 servicios y que cada área cuente con 10 servicios.
-- Si algo no cuadra, aborta y revierte toda la carga.
do $$
begin
  if (select count(*) from public.areas_practica) <> 15 then
    raise exception 'CARGA ABORTADA: se esperaban 15 áreas.';
  end if;

  if (select count(*) from public.servicios) <> 150 then
    raise exception 'CARGA ABORTADA: se esperaban 150 servicios.';
  end if;

  if exists (
    select 1 from public.areas_practica a
    where (select count(*) from public.servicios s where s.area_id = a.id) <> 10
  ) then
    raise exception 'CARGA ABORTADA: cada área debe tener exactamente 10 servicios.';
  end if;
end
$$;

commit;
