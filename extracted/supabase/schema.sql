-- Punit Kundu Portfolio — Supabase schema
-- Run this in the Supabase SQL Editor, then copy your project URL + anon key into js/supabase-config.js

-- Profiles (singleton content block)
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  name text,
  role text,
  from_location text,
  company text,
  program text,
  institution text,
  interests text,
  email text,
  updated_at timestamptz default now()
);

-- Projects (Highlights section)
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text,
  description text,
  image_url text,
  link_url text,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Skills / AI Toolkit (Capabilities + Skill cloud)
create table if not exists skills (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text check (category in ('crk','ai','dev','mk','bz')),
  size int default 20,
  color text,
  created_at timestamptz default now()
);

-- Awards & Caps (Scoreboard)
create table if not exists awards (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  level text,
  description text,
  display_order int default 0,
  created_at timestamptz default now()
);

-- Experience / Innings (Timeline)
create table if not exists experience (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  ball_color text default 'red',
  display_order int default 0,
  created_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table projects enable row level security;
alter table skills enable row level security;
alter table awards enable row level security;
alter table experience enable row level security;

-- Public read (portfolio frontend)
create policy "Public read profiles" on profiles for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read awards" on awards for select using (true);
create policy "Public read experience" on experience for select using (true);

-- Authenticated admin full access
create policy "Admin all profiles" on profiles for all using (auth.uid() is not null);
create policy "Admin all projects" on projects for all using (auth.uid() is not null);
create policy "Admin all skills" on skills for all using (auth.uid() is not null);
create policy "Admin all awards" on awards for all using (auth.uid() is not null);
create policy "Admin all experience" on experience for all using (auth.uid() is not null);

-- Seed a default profile row
insert into profiles (name, role, from_location, company, program, institution, interests, email)
values (
  'Punit Kundu',
  'Fast bowler',
  'Kaithal, Haryana',
  'Founder, Kundu Naturals',
  'Digital Marketing with AI',
  'Zed-King Group of Institutions',
  'Video editing, AI coding',
  'kundupunit927@gmail.com'
) on conflict do nothing;
