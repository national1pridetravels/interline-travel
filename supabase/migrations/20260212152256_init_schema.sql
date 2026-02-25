-- Interline Travel production schema for Supabase
-- Run this entire file once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id integer primary key,
  hero_title text not null,
  hero_subtitle text not null,
  updated_at timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);

create table if not exists public.testimonials (
  id text primary key,
  quote text not null,
  name text not null,
  handle text not null,
  tone text not null default 'tone-a',
  sort_order integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint testimonials_tone_check check (tone in ('tone-a', 'tone-b', 'tone-c'))
);

create table if not exists public.features (
  id text primary key,
  title text not null,
  description text not null,
  icon text not null default 'price',
  sort_order integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint features_icon_check check (icon in ('price', 'technology', 'support', 'finance', 'globe', 'ticket'))
);

create table if not exists public.trips (
  id text primary key,
  title text not null,
  destination text not null,
  duration text not null,
  price numeric(10, 2) not null default 0,
  rating numeric(2, 1) not null default 0,
  seats integer not null default 0,
  departure date not null,
  summary text not null,
  tags text[] not null default '{}',
  theme text not null default 'coastal',
  featured boolean not null default false,
  sort_order integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint trips_theme_check check (theme in ('coastal', 'alpine', 'desert', 'city', 'island', 'heritage')),
  constraint trips_rating_check check (rating >= 0 and rating <= 5),
  constraint trips_price_check check (price >= 0),
  constraint trips_seats_check check (seats >= 0)
);

create index if not exists testimonials_sort_order_idx on public.testimonials (sort_order);
create index if not exists features_sort_order_idx on public.features (sort_order);
create index if not exists trips_sort_order_idx on public.trips (sort_order);
create index if not exists trips_destination_idx on public.trips (destination);
create index if not exists trips_departure_idx on public.trips (departure);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_content_touch on public.site_content;
create trigger trg_site_content_touch
before update on public.site_content
for each row execute function public.touch_updated_at();

drop trigger if exists trg_testimonials_touch on public.testimonials;
create trigger trg_testimonials_touch
before update on public.testimonials
for each row execute function public.touch_updated_at();

drop trigger if exists trg_features_touch on public.features;
create trigger trg_features_touch
before update on public.features
for each row execute function public.touch_updated_at();

drop trigger if exists trg_trips_touch on public.trips;
create trigger trg_trips_touch
before update on public.trips
for each row execute function public.touch_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.admin_users enable row level security;
alter table public.site_content enable row level security;
alter table public.testimonials enable row level security;
alter table public.features enable row level security;
alter table public.trips enable row level security;

drop policy if exists "admin_users_select" on public.admin_users;
create policy "admin_users_select"
on public.admin_users
for select
to authenticated
using (auth.uid() = user_id or public.is_admin());

drop policy if exists "admin_users_insert" on public.admin_users;
create policy "admin_users_insert"
on public.admin_users
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    public.is_admin()
    or (select count(*) from public.admin_users) = 0
  )
);

drop policy if exists "admin_users_delete" on public.admin_users;
create policy "admin_users_delete"
on public.admin_users
for delete
to authenticated
using (public.is_admin());

drop policy if exists "site_content_public_read" on public.site_content;
create policy "site_content_public_read"
on public.site_content
for select
to anon, authenticated
using (true);

drop policy if exists "site_content_admin_write" on public.site_content;
create policy "site_content_admin_write"
on public.site_content
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "testimonials_public_read" on public.testimonials;
create policy "testimonials_public_read"
on public.testimonials
for select
to anon, authenticated
using (true);

drop policy if exists "testimonials_admin_write" on public.testimonials;
create policy "testimonials_admin_write"
on public.testimonials
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "features_public_read" on public.features;
create policy "features_public_read"
on public.features
for select
to anon, authenticated
using (true);

drop policy if exists "features_admin_write" on public.features;
create policy "features_admin_write"
on public.features
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "trips_public_read" on public.trips;
create policy "trips_public_read"
on public.trips
for select
to anon, authenticated
using (true);

drop policy if exists "trips_admin_write" on public.trips;
create policy "trips_admin_write"
on public.trips
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into public.site_content (id, hero_title, hero_subtitle)
values (1, 'WELCOME TO INTERLINE TRAVEL', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit')
on conflict (id) do update
set
  hero_title = excluded.hero_title,
  hero_subtitle = excluded.hero_subtitle;

insert into public.testimonials (id, quote, name, handle, tone, sort_order)
values
  ('testimonial_john', 'sea odio sit amet nibh vulputate', 'John Doe', '@fbbhfgn', 'tone-a', 1),
  ('testimonial_anna', 'sea odio sit amet nibh vulputate', 'Anna Doe', '@fbbhfgn', 'tone-b', 2),
  ('testimonial_jude', 'sea odio sit amet nibh vulputate', 'Jude Doe', '@fbbhfgn', 'tone-c', 3)
on conflict (id) do nothing;

insert into public.features (id, title, description, icon, sort_order)
values
  ('feature_price', 'ROCK BOTTOM PRICES', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus tortor.', 'price', 1),
  ('feature_tech', 'TECHNOLOGY', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus tortor.', 'technology', 2),
  ('feature_support', 'SELLAR SUPPORT', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus tortor.', 'support', 3),
  ('feature_finance', 'FINANCE', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar lectus tortor.', 'finance', 4)
on conflict (id) do nothing;

insert into public.trips (
  id, title, destination, duration, price, rating, seats, departure, summary, tags, theme, featured, sort_order
)
values
  (
    'trip_paris',
    'Paris Spring Escape',
    'France',
    '5 Days / 4 Nights',
    1299,
    4.8,
    12,
    '2026-04-14',
    'Boutique hotel stay, Seine river cruise, and curated food walks in hidden neighborhoods.',
    array['City Break', 'Couples'],
    'city',
    true,
    1
  ),
  (
    'trip_bali',
    'Bali Coastal Retreat',
    'Indonesia',
    '6 Days / 5 Nights',
    1599,
    4.9,
    10,
    '2026-05-05',
    'Beachfront resort, temple trail, sunset dinner cruise, and private airport transfers.',
    array['Beach', 'Relax'],
    'island',
    true,
    2
  ),
  (
    'trip_zermatt',
    'Alpine Explorer',
    'Switzerland',
    '7 Days / 6 Nights',
    2240,
    4.7,
    8,
    '2026-06-11',
    'Scenic rail passes, glacier viewpoints, mountain chalets, and guided hiking routes.',
    array['Adventure', 'Scenic'],
    'alpine',
    false,
    3
  ),
  (
    'trip_dubai',
    'Dubai Luxe Weekend',
    'UAE',
    '4 Days / 3 Nights',
    980,
    4.5,
    16,
    '2026-03-23',
    'Downtown stay, desert safari, marina night cruise, and premium city transport included.',
    array['Luxury', 'Short Trip'],
    'desert',
    false,
    4
  ),
  (
    'trip_kyoto',
    'Kyoto Heritage Journey',
    'Japan',
    '8 Days / 7 Nights',
    1990,
    4.9,
    9,
    '2026-04-30',
    'Temple district walking tours, ryokan stays, tea ceremony access, and local rail cards.',
    array['Culture', 'History'],
    'heritage',
    true,
    5
  ),
  (
    'trip_maldives',
    'Maldives Island Hopper',
    'Maldives',
    '5 Days / 4 Nights',
    2699,
    4.9,
    6,
    '2026-07-19',
    'Water villa stay, snorkeling charter, wellness treatments, and private speedboat transfers.',
    array['Honeymoon', 'Premium'],
    'coastal',
    false,
    6
  )
on conflict (id) do nothing;
