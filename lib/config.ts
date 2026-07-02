// SERVER-ONLY — importa lib/supabase que usa SUPABASE_SERVICE_ROLE_KEY.
// No importar este archivo desde client components.
// Los client components deben importar desde lib/config-utils.ts.

import { supabase } from './supabase'
import { CONFIG_DEFAULTS } from './config-utils'

export type {
  ContactoConfig,
  HorarioAtencionConfig,
  HorarioCitasConfig,
  FestivosConfig,
  HeroConfig,
  RedesSocialesConfig,
  AgendaPageConfig,
  ContactoPageConfig,
  BlogPageConfig,
  NosotrosPageConfig,
  TrustBlockConfig,
  ServicesBlockConfig,
  UrgencyBlockConfig,
  DifferentialBlockConfig,
  FinalCtaConfig,
  TestimonialsBlockConfig,
  FooterConfig,
  PorQueBlockConfig,
  EquipoBlockConfig,
  MetodologiaBlockConfig,
  ConfidencialidadBlockConfig,
  CtaNosotrosConfig,
  ImagenesConfig,
  SiteConfig,
} from './config-utils'

export {
  CONFIG_DEFAULTS,
  buildWhatsAppUrl,
  generateSlots,
  isDateAvailable,
  isOfficeHours,
} from './config-utils'

export async function getSiteConfig() {
  const { data, error } = await supabase
    .from('configuracion')
    .select('clave, valor')

  if (error || !data?.length) return CONFIG_DEFAULTS

  const map = Object.fromEntries(data.map((r) => [r.clave as string, r.valor]))

  return {
    contacto:         { ...CONFIG_DEFAULTS.contacto,         ...(map['contacto']          ?? {}) },
    horario_atencion: { ...CONFIG_DEFAULTS.horario_atencion, ...(map['horario_atencion']  ?? {}) },
    horario_citas:    { ...CONFIG_DEFAULTS.horario_citas,    ...(map['horario_citas']     ?? {}) },
    festivos:         { ...CONFIG_DEFAULTS.festivos,         ...(map['festivos']          ?? {}) },
    hero:             { ...CONFIG_DEFAULTS.hero,             ...(map['hero']              ?? {}) },
    redes_sociales:   { ...CONFIG_DEFAULTS.redes_sociales,   ...(map['redes_sociales']    ?? {}) },
    agenda_page:      { ...CONFIG_DEFAULTS.agenda_page,      ...(map['agenda_page']       ?? {}) },
    contacto_page:    { ...CONFIG_DEFAULTS.contacto_page,    ...(map['contacto_page']     ?? {}) },
    blog_page:        { ...CONFIG_DEFAULTS.blog_page,        ...(map['blog_page']         ?? {}) },
    nosotros_page:    { ...CONFIG_DEFAULTS.nosotros_page,    ...(map['nosotros_page']     ?? {}) },
    trust_block:      { ...CONFIG_DEFAULTS.trust_block,      ...(map['trust_block']       ?? {}) },
    services_block:   { ...CONFIG_DEFAULTS.services_block,   ...(map['services_block']    ?? {}) },
    urgency_block:    { ...CONFIG_DEFAULTS.urgency_block,    ...(map['urgency_block']     ?? {}) },
    differential_block: { ...CONFIG_DEFAULTS.differential_block, ...(map['differential_block'] ?? {}) },
    final_cta:        { ...CONFIG_DEFAULTS.final_cta,        ...(map['final_cta']         ?? {}) },
    testimonials_block: { ...CONFIG_DEFAULTS.testimonials_block, ...(map['testimonials_block'] ?? {}) },
    footer:           { ...CONFIG_DEFAULTS.footer,           ...(map['footer']            ?? {}) },
    por_que_block:    { ...CONFIG_DEFAULTS.por_que_block,    ...(map['por_que_block']     ?? {}) },
    equipo_block:     { ...CONFIG_DEFAULTS.equipo_block,     ...(map['equipo_block']      ?? {}) },
    metodologia_block: { ...CONFIG_DEFAULTS.metodologia_block, ...(map['metodologia_block'] ?? {}) },
    confidencialidad_block: { ...CONFIG_DEFAULTS.confidencialidad_block, ...(map['confidencialidad_block'] ?? {}) },
    cta_nosotros:     { ...CONFIG_DEFAULTS.cta_nosotros,     ...(map['cta_nosotros']      ?? {}) },
    imagenes:         {
      ...CONFIG_DEFAULTS.imagenes,
      ...(map['imagenes'] ?? {}),
      servicios: { ...CONFIG_DEFAULTS.imagenes.servicios, ...(map['imagenes']?.servicios ?? {}) },
    },
  }
}
