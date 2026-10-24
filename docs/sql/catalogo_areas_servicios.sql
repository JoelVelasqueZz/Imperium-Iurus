-- IMPERIUM IURIS — Catálogo de áreas de práctica y servicios
--
-- Word Abogados Asociados, sección 3 - 15 áreas de práctica y 150 servicios.
--
-- SOLO DESARROLLO: no ejecutar en producción sin revisión previa.
-- Ejecuta el archivo COMPLETO, sin texto seleccionado.
-- Si ocurre un error ("current transaction is aborted"), ejecuta solo: ROLLBACK;
--
-- Seguridad:
--   RLS activado y sin políticas para impedir el acceso directo de anon y authenticated.
--   REVOKE ALL a public, anon, authenticated y service_role.
--   GRANT mínimo a service_role para las operaciones necesarias del servidor.
--   El administrador se valida en la API mediante isAdminUser().
--   El navegador nunca consulta estas tablas directamente.
--
-- Como dependencia requiere public.set_updated_at(), creada en M1.

begin;

-- Verifica que exista la función set_updated_at() y que las tablas areas_practica
-- y servicios todavía no existan en el esquema public.
do $$
begin
  if pg_catalog.to_regprocedure('public.set_updated_at()') is null then
    raise exception 'T15 ABORTADA: falta public.set_updated_at(). Aplica M1 primero.';
  end if;

  if pg_catalog.to_regclass('public.areas_practica') is not null
     or pg_catalog.to_regclass('public.servicios') is not null then
    raise exception 'T15 ABORTADA: areas_practica o servicios ya existen en public.';
  end if;
end
$$;

-- Crea el catálogo de áreas de práctica jurídica.
create table public.areas_practica (
  id         uuid        not null default gen_random_uuid(),
  slug       text        not null,
  numero     integer     not null,
  nombre     text        not null,
  orden      integer     not null default 0,
  activo     boolean     not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint areas_practica_pkey        primary key (id),
  constraint areas_practica_slug_key    unique (slug),
  constraint areas_practica_numero_key  unique (numero),
  constraint areas_practica_slug_check
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint areas_practica_numero_check
    check (numero > 0),
  constraint areas_practica_nombre_check
    check (btrim(nombre) <> '')
);

-- Crea el catálogo de servicios asociados a cada área.
-- Mantiene separado el contenido fuente de la descripción pública.
create table public.servicios (
  id                  uuid        not null default gen_random_uuid(),
  area_id             uuid        not null,
  slug                text        not null,
  numero              integer     not null,
  nombre              text        not null,
  objeto_actuacion    text,
  servicio_ofrecido   text        not null,
  descripcion_publica text,
  orden               integer     not null default 0,
  activo              boolean     not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  constraint servicios_pkey            primary key (id),
  constraint servicios_area_numero_key unique (area_id, numero),
  constraint servicios_area_slug_key   unique (area_id, slug),
  constraint servicios_slug_check
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint servicios_numero_check
    check (numero > 0),
  constraint servicios_nombre_check
    check (btrim(nombre) <> ''),
  constraint servicios_servicio_ofrecido_check
    check (btrim(servicio_ofrecido) <> ''),
  constraint servicios_area_id_fkey
    foreign key (area_id) references public.areas_practica (id) on delete restrict
);

-- Sin índice adicional en area_id: los UNIQUE (area_id, ...) ya lo cubren.

-- Actualiza updated_at automáticamente antes de modificar un área
-- o un servicio, reutilizando la función definida en M1.
create trigger areas_practica_updated_at
  before update on public.areas_practica
  for each row execute function public.set_updated_at();

create trigger servicios_updated_at
  before update on public.servicios
  for each row execute function public.set_updated_at();

-- Activa RLS en ambas tablas.
-- El acceso se gestiona desde las rutas del servidor, siguiendo el patrón de seguridad de M2.
alter table public.areas_practica enable row level security;
alter table public.servicios      enable row level security;

-- Revoca todos los privilegios de tabla a public, anon, authenticated
-- y service_role antes de conceder únicamente los permisos necesarios.
revoke all on table public.areas_practica, public.servicios
  from public, anon, authenticated, service_role;

-- Concede permisos mínimos a service_role para las rutas del servidor.
-- isAdminUser() debe validar al administrador antes de ejecutar operaciones.
-- No se concede DELETE: la FK usa RESTRICT y las áreas y servicios
-- se desactivan mediante activo = false en lugar de eliminarlos.
grant select, insert, update on table public.areas_practica to service_role;
grant select, insert, update on table public.servicios      to service_role;

commit;
