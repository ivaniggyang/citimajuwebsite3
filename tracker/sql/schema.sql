-- CMC Projects Tracker — Supabase Schema
-- Run this entire file in Supabase SQL Editor

create type user_role as enum ('admin', 'project_manager', 'site_supervisor');
create type project_status as enum ('tender', 'active', 'on_hold', 'completed', 'cancelled');

create table public.users (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null unique,
  full_name     text not null,
  role          user_role not null default 'site_supervisor',
  phone         text,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table public.projects (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  project_no      text unique,
  client          text,
  location        text,
  description     text,
  contract_value  numeric(15,2) not null default 0,
  start_date      date,
  end_date        date,
  status          project_status not null default 'active',
  created_by      uuid references public.users(id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table public.project_users (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  user_id     uuid not null references public.users(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  unique (project_id, user_id)
);

create table public.work_items (
  id                  uuid primary key default gen_random_uuid(),
  project_id          uuid not null references public.projects(id) on delete cascade,
  sequence            integer not null default 0,
  name                text not null,
  description         text,
  unit                text,
  quantity            numeric(15,3),
  unit_rate           numeric(15,2),
  contract_amount     numeric(15,2) not null default 0,
  pct_physical        numeric(5,2) not null default 0 check (pct_physical between 0 and 100),
  amount_claimed      numeric(15,2) not null default 0,
  is_active           boolean not null default true,
  updated_by          uuid references public.users(id),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table public.claim_history (
  id                  uuid primary key default gen_random_uuid(),
  work_item_id        uuid not null references public.work_items(id) on delete cascade,
  project_id          uuid not null references public.projects(id) on delete cascade,
  claim_no            integer,
  pct_physical_prev   numeric(5,2),
  pct_physical_new    numeric(5,2),
  amount_claimed_prev numeric(15,2),
  amount_claimed_new  numeric(15,2),
  remarks             text,
  updated_by          uuid references public.users(id),
  created_at          timestamptz not null default now()
);

create table public.variations (
  id              uuid primary key default gen_random_uuid(),
  project_id      uuid not null references public.projects(id) on delete cascade,
  variation_no    text,
  description     text not null,
  amount          numeric(15,2) not null default 0,
  status          text not null default 'pending',
  submitted_at    date, approved_at date,
  approved_by     uuid references public.users(id),
  created_by      uuid references public.users(id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table public.subcontractors (
  id uuid primary key default gen_random_uuid(), name text not null,
  reg_no text, contact text, email text, created_at timestamptz not null default now()
);

create table public.subcontractor_packages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  subcontractor_id uuid not null references public.subcontractors(id),
  description text, contract_amount numeric(15,2) not null default 0,
  created_at timestamptz not null default now()
);

create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger trg_users_updated_at      before update on public.users      for each row execute function set_updated_at();
create trigger trg_projects_updated_at   before update on public.projects   for each row execute function set_updated_at();
create trigger trg_work_items_updated_at before update on public.work_items for each row execute function set_updated_at();
create trigger trg_variations_updated_at before update on public.variations for each row execute function set_updated_at();

alter table public.users               enable row level security;
alter table public.projects            enable row level security;
alter table public.project_users       enable row level security;
alter table public.work_items          enable row level security;
alter table public.claim_history       enable row level security;
alter table public.variations          enable row level security;
alter table public.subcontractors      enable row level security;
alter table public.subcontractor_packages enable row level security;

create or replace function current_user_role() returns user_role language sql security definer stable as $$
  select role from public.users where id = auth.uid();
$$;
create or replace function is_assigned_to_project(proj_id uuid) returns boolean language sql security definer stable as $$
  select exists (select 1 from public.project_users where project_id = proj_id and user_id = auth.uid());
$$;

create policy "users_select"       on public.users for select using (id = auth.uid() or current_user_role() = 'admin');
create policy "users_self_insert"  on public.users for insert with check (id = auth.uid() and role = 'site_supervisor');
create policy "users_update_admin" on public.users for update using (current_user_role() = 'admin');

create policy "projects_select"       on public.projects for select using (current_user_role() = 'admin' or is_assigned_to_project(id));
create policy "projects_insert_admin" on public.projects for insert with check (current_user_role() = 'admin');
create policy "projects_update_admin" on public.projects for update using (current_user_role() = 'admin');

create policy "project_users_select"       on public.project_users for select using (current_user_role() = 'admin' or user_id = auth.uid());
create policy "project_users_manage_admin" on public.project_users for all   using (current_user_role() = 'admin');

create policy "work_items_select" on public.work_items for select using (current_user_role() = 'admin' or is_assigned_to_project(project_id));
create policy "work_items_insert" on public.work_items for insert with check (current_user_role() = 'admin' or (current_user_role() = 'project_manager' and is_assigned_to_project(project_id)));
create policy "work_items_update" on public.work_items for update using (current_user_role() = 'admin' or is_assigned_to_project(project_id));

create policy "claim_history_select" on public.claim_history for select using (current_user_role() = 'admin' or is_assigned_to_project(project_id));
create policy "claim_history_insert" on public.claim_history for insert with check (current_user_role() = 'admin' or is_assigned_to_project(project_id));

create policy "variations_select"  on public.variations  for select using (current_user_role() = 'admin' or is_assigned_to_project(project_id));
create policy "subcontractors_admin" on public.subcontractors for all using (current_user_role() = 'admin');
create policy "subcontractor_packages_select" on public.subcontractor_packages for select using (current_user_role() = 'admin' or is_assigned_to_project(project_id));

-- Auto-create user profile on sign-up (handles email confirmation flow)
create or replace function public.handle_new_auth_user() returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)), 'site_supervisor')
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_auth_user();

create index idx_project_users_project  on public.project_users(project_id);
create index idx_project_users_user     on public.project_users(user_id);
create index idx_work_items_project     on public.work_items(project_id, sequence);
create index idx_claim_history_workitem on public.claim_history(work_item_id);
create index idx_claim_history_project  on public.claim_history(project_id);