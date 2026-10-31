-- Estrutura do banco do portfólio no Supabase.
-- Rode no painel: SQL Editor > New query > cole este arquivo > Run.
-- Pode ser executado mais de uma vez: não apaga dados e recria só as regras.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- qualquer visitante pode ENVIAR mensagem; só o dono logado LÊ e ATUALIZA
drop policy if exists "qualquer um pode enviar mensagem" on public.messages;
create policy "qualquer um pode enviar mensagem"
  on public.messages for insert to anon, authenticated with check (true);

drop policy if exists "so logado le mensagens" on public.messages;
create policy "so logado le mensagens"
  on public.messages for select to authenticated using (true);

drop policy if exists "so logado atualiza mensagens" on public.messages;
create policy "so logado atualiza mensagens"
  on public.messages for update to authenticated using (true);

-- Guarda só o slug (nome do repositório em minúsculas); os dados vêm da API do GitHub.
create table if not exists public.featured_projects (
  slug text primary key,
  created_at timestamptz not null default now()
);

alter table public.featured_projects enable row level security;

-- a página inicial é pública: todos LEEM; só o dono logado MARCA e DESMARCA
drop policy if exists "todos leem destaques" on public.featured_projects;
create policy "todos leem destaques"
  on public.featured_projects for select to anon, authenticated using (true);

drop policy if exists "so logado marca destaque" on public.featured_projects;
create policy "so logado marca destaque"
  on public.featured_projects for insert to authenticated with check (true);

drop policy if exists "so logado desmarca destaque" on public.featured_projects;
create policy "so logado desmarca destaque"
  on public.featured_projects for delete to authenticated using (true);
