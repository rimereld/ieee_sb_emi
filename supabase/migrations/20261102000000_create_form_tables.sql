-- Tables behind the Join and Contact forms.
-- Visitors (the anon role) may only INSERT; reading is reserved for the branch team
-- through the Supabase dashboard or the service role.

create table if not exists public.join_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text check (char_length(phone) <= 40),
  department text check (char_length(department) <= 120),
  study_year text check (char_length(study_year) <= 60),
  interests text check (char_length(interests) <= 1000),
  motivation text check (char_length(motivation) <= 2000),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  subject text check (char_length(subject) <= 160),
  message text not null check (char_length(message) between 1 and 4000),
  created_at timestamptz not null default now()
);

alter table public.join_applications enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can submit an application" on public.join_applications;
create policy "Anyone can submit an application"
  on public.join_applications for insert to anon, authenticated with check (true);

drop policy if exists "Anyone can send a message" on public.contact_messages;
create policy "Anyone can send a message"
  on public.contact_messages for insert to anon, authenticated with check (true);
