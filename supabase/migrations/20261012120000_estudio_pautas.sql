-- Estúdio de Pautas BHM: banco de dados, acesso, tempo real e arquivo da logo.

-- 1) Quem pode entrar: o administrador inclui aqui o e-mail de cada pessoa da equipe.
create table if not exists public.estudio_acesso (
  email text primary key,
  observacao text,
  criado_em timestamptz not null default now()
);

-- 2) Nome de cada pessoa (o papel fica dentro do app, em config/equipe).
create table if not exists public.estudio_perfis (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  atualizado_em timestamptz not null default now()
);

-- 3) Documentos do app: pautas, atividade (histórico) e configurações.
create table if not exists public.estudio_docs (
  path text primary key,
  collection text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create index if not exists estudio_docs_collection_idx on public.estudio_docs (collection, updated_at desc);

-- A pessoa conectada está liberada?
create or replace function public.estudio_sou_membro()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.estudio_acesso
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.estudio_sou_membro() from public;
grant execute on function public.estudio_sou_membro() to authenticated;

alter table public.estudio_acesso enable row level security;   -- sem políticas: só o painel do Supabase edita
alter table public.estudio_perfis enable row level security;
alter table public.estudio_docs   enable row level security;

drop policy if exists "membros leem perfis" on public.estudio_perfis;
create policy "membros leem perfis" on public.estudio_perfis
  for select to authenticated using (public.estudio_sou_membro());
drop policy if exists "cada um cria o proprio perfil" on public.estudio_perfis;
create policy "cada um cria o proprio perfil" on public.estudio_perfis
  for insert to authenticated with check (user_id = auth.uid() and public.estudio_sou_membro());
drop policy if exists "cada um altera o proprio perfil" on public.estudio_perfis;
create policy "cada um altera o proprio perfil" on public.estudio_perfis
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "membros leem docs" on public.estudio_docs;
create policy "membros leem docs" on public.estudio_docs
  for select to authenticated using (public.estudio_sou_membro());
drop policy if exists "membros criam docs" on public.estudio_docs;
create policy "membros criam docs" on public.estudio_docs
  for insert to authenticated with check (public.estudio_sou_membro());
drop policy if exists "membros alteram docs" on public.estudio_docs;
create policy "membros alteram docs" on public.estudio_docs
  for update to authenticated using (public.estudio_sou_membro()) with check (public.estudio_sou_membro());
drop policy if exists "membros apagam docs" on public.estudio_docs;
create policy "membros apagam docs" on public.estudio_docs
  for delete to authenticated using (public.estudio_sou_membro());

-- Tempo real: todos veem as mudanças dos outros na hora.
alter table public.estudio_docs replica identity full;
do $$ begin
  alter publication supabase_realtime add table public.estudio_docs;
exception when duplicate_object then null; end $$;

-- Arquivo oficial da logo.
insert into storage.buckets (id, name, public)
values ('estudio-marca', 'estudio-marca', true)
on conflict (id) do nothing;
drop policy if exists "membros enviam a logo" on storage.objects;
create policy "membros enviam a logo" on storage.objects
  for insert to authenticated with check (bucket_id = 'estudio-marca' and public.estudio_sou_membro());
drop policy if exists "membros trocam a logo" on storage.objects;
create policy "membros trocam a logo" on storage.objects
  for update to authenticated using (bucket_id = 'estudio-marca' and public.estudio_sou_membro());

-- Libere a equipe trocando os e-mails abaixo e rodando estas linhas:
-- insert into public.estudio_acesso (email, observacao) values
--   ('everton@bhm.adv.br', 'Marketing'),
--   ('bruno@bhm.adv.br', 'Dr. Bruno');
