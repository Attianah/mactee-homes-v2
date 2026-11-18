-- Mactee Homes — Postgres schema (Supabase or any Postgres with PostgREST)
-- Run this once in the Supabase SQL editor (or psql) before db/seed.sql.

create extension if not exists pgcrypto;

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  area text,
  property_type text,
  listing_type text not null,
  price numeric not null,
  beds numeric,
  baths numeric,
  sqm numeric,
  badge text,
  description text,
  amenities jsonb not null default '[]'::jsonb,
  images jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  preferred_date text,
  service_interest text not null,
  property_title text,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists properties_area_idx on properties (area);
create index if not exists properties_listing_type_idx on properties (listing_type);
create index if not exists properties_price_idx on properties (price);

alter table properties enable row level security;
alter table enquiries enable row level security;

-- Visitors may read listings and send an enquiry. Enquiries are never readable
-- with the public key, so open the table in the Supabase table editor to read them.
grant select on properties to anon, authenticated;
grant insert on enquiries to anon, authenticated;

drop policy if exists "Public can read properties" on properties;
create policy "Public can read properties"
  on properties for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can send an enquiry" on enquiries;
create policy "Anyone can send an enquiry"
  on enquiries for insert
  to anon, authenticated
  with check (true);