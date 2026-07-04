-- Tabla de suscripciones de Web Push (notificaciones al admin).
-- Ejecutar en Supabase → SQL Editor.

create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text unique not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

-- Sin políticas RLS para anon/authenticated: solo se accede vía service_role
-- (igual que la tabla `configuracion`).
alter table push_subscriptions enable row level security;
