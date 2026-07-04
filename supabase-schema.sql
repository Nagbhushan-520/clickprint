-- ============================================================
-- Click Print — Supabase schema (Phase 1)
-- Run this once in Supabase → SQL Editor → New query → Run.
-- ============================================================

-- Orders table. Flexible fields stored as JSONB so the app can evolve.
create table if not exists public.orders (
  id            text primary key,
  config        jsonb not null,
  design_source text,
  uploaded_file jsonb,
  pricing       jsonb not null,
  customer      jsonb,
  status        text not null default 'draft',
  payment_ref   text,
  paid_at       timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

-- Row Level Security: lock the table down. All access is server-side via the
-- service-role key (which bypasses RLS), so we intentionally add NO public
-- policies. Customer-scoped policies get added in Phase 3 (customer accounts).
alter table public.orders enable row level security;

-- ------------------------------------------------------------
-- Storage bucket for customer uploads + editor design exports.
-- Public read so print previews / files resolve by URL; writes are
-- server-side only (service role).
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('designs', 'designs', true)
on conflict (id) do nothing;

-- Allow public read of files in the designs bucket.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Public read designs'
  ) then
    create policy "Public read designs"
      on storage.objects for select
      using (bucket_id = 'designs');
  end if;
end $$;
