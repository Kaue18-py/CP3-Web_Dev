# Portfólio — CP3 Web Dev

Portfólio pessoal em React com tema hacker inspirado em Mr. Robot. O site abre numa tela de login:
o visitante entra como convidado e navega por botões entre as páginas; o dono entra com e-mail e
senha e acessa um dashboard com as mensagens recebidas.

>  Site Publicado: cp-3-web-dev.vercel.app

## Páginas

| Rota              | O que tem                                                            |
| ----------------- | -------------------------------------------------------------------- |
| `/`               | tela de login: "hello, friend.", log de boot e acesso como convidado |
| `/inicio`         | "ACESSO CONCEDIDO", o menu com botões e os projetos em destaque      |
| `/sobre`          | bio (`cat ~/.plan`) e habilidades em forma de varredura nmap         |
| `/projetos`       | projetos carregados da API do GitHub                                 |
| `/projetos/:slug` | dados do projeto e o README do repositório                           |
| `/contato`        | formulário com validação por campo; a mensagem chega por e-mail      |
| `/dashboard`      | área do dono (precisa de login): mensagens e projetos em destaque    |

Links diretos (ex.: `/contato`) abrem na página certa sem passar pelo login. O `/dashboard` é a
exceção: sem login, o visitante é mandado de volta para a tela de login.

## Como os projetos são escolhidos

Nenhum projeto é cadastrado no código: tudo vem da API do GitHub. A seleção é feita com
**topics** (etiquetas) nos próprios repositórios:

| Topic                | Efeito no site                               |
| -------------------- | -------------------------------------------- |
| `portfolio`          | o repositório aparece em `/projetos`         |
| `em-desenvolvimento` | o card ganha o selo `[ EM DESENVOLVIMENTO ]` |

Para adicionar ou remover um projeto, basta mudar as topics no GitHub (⚙️ ao lado de **About**).
As respostas ficam 10 minutos em cache (TanStack Query), e o limite da API sem login
(60 requisições por hora) é tratado com uma mensagem e um botão de tentar de novo.

## Tecnologias

- **Vite + React 19** (JavaScript)
- **Tailwind CSS v4**, com tema claro/escuro
- **React Router** para as rotas, com carregamento sob demanda
- **TanStack Query** para buscar e guardar em cache os dados do GitHub
- **React Hook Form + Zod** para a validação do formulário
- **Supabase** para login, mensagens e projetos em destaque
- **EmailJS** para enviar as mensagens de contato por e-mail
- **Vitest + Testing Library** para os testes
- **ESLint, Prettier, Husky, lint-staged e commitlint** para o padrão de código e de commits
- **Vercel** para o deploy

## Como rodar

Pré-requisito: Node.js 20 ou superior.

```bash
git clone https://github.com/Kaue18-py/CP3-Web_Dev.git
cd CP3-Web_Dev
npm install
cp .env.example .env   # cria o .env a partir do exemplo; depois preencha as variáveis
npm run dev
```

### Variáveis de ambiente

| Variável                   | Descrição                                                                   |
| -------------------------- | --------------------------------------------------------------------------- |
| `VITE_GITHUB_USERNAME`     | usuário do GitHub cujos repositórios aparecem no site (padrão: `Kaue18-py`) |
| `VITE_SUPABASE_URL`        | URL do projeto no Supabase                                                  |
| `VITE_SUPABASE_ANON_KEY`   | chave pública do Supabase (Publishable key `sb_publishable_...` ou anon)    |
| `VITE_EMAILJS_SERVICE_ID`  | ID do serviço de e-mail no EmailJS                                          |
| `VITE_EMAILJS_TEMPLATE_ID` | ID do template de e-mail no EmailJS                                         |
| `VITE_EMAILJS_PUBLIC_KEY`  | chave pública do EmailJS                                                    |

### Configurando o EmailJS

1. Crie uma conta em [emailjs.com](https://www.emailjs.com/) e conecte seu e-mail em **Email Services**.
2. Em **Email Templates**, crie um template usando as variáveis `{{name}}`, `{{email}}` e `{{message}}`.
3. Copie o Service ID, o Template ID e a Public Key (em **Account**) para o `.env`.

Sem essas variáveis o formulário continua validando, mas o envio mostra a mensagem de erro.

### Configurando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com/).
2. Em **SQL Editor**, rode o arquivo [`supabase/schema.sql`](supabase/schema.sql): ele cria as tabelas
   `messages` e `featured_projects` com as regras de segurança (RLS).
3. Em **Authentication → Users → Add user**, crie o usuário do dono (e-mail e senha do dashboard).
4. Em **Project Settings → API Keys**, copie a URL do projeto e a Publishable key para o `.env`.

| Tabela              | Quem pode o quê                                                       |
| ------------------- | --------------------------------------------------------------------- |
| `messages`          | qualquer visitante envia; só o dono logado lê e marca como respondida |
| `featured_projects` | qualquer visitante lê; só o dono logado marca e desmarca destaques    |

### Scripts

| Comando              | O que faz                       |
| -------------------- | ------------------------------- |
| `npm run dev`        | servidor de desenvolvimento     |
| `npm run build`      | build de produção               |
| `npm run preview`    | serve o build localmente        |
| `npm run lint`       | verifica o código com ESLint    |
| `npm run format`     | formata o código com Prettier   |
| `npm test`           | roda os testes                  |
| `npm run test:watch` | roda os testes a cada alteração |

## Estrutura de pastas

```
src/
  components/
    ui/        # componentes visuais reaproveitados (Button, Card, Input, Skeleton...)
    layout/    # Header, Footer, Layout
    <feature>/ # componentes de uma funcionalidade (projects, contact, dashboard)
  pages/       # uma página por rota
  routes/      # definição das rotas e rota protegida
  services/    # acesso às APIs (GitHub, Supabase, EmailJS)
  hooks/       # hooks personalizados que ligam os services aos componentes
  contexts/    # Context providers (tema, autenticação)
  data/        # conteúdo pessoal do site (bio, stack, links)
  schemas/     # schemas de validação (Zod)
  utils/       # funções auxiliares
  test/        # setup dos testes
```

Os componentes visuais não acessam APIs diretamente. O fluxo de dados é sempre
`services/` → `hooks/` → componente.

## Padrões do projeto

### Nomenclatura

- Componentes e páginas em **PascalCase** (`ProjectCard.jsx`, `HomePage.jsx`)
- Hooks começando com **`use`** (`useRepos.js`)
- Services terminando em **`Service`** (`githubService.js`)
- Constantes em **UPPER_SNAKE_CASE**
- Código em inglês; textos da interface, commits e documentação em português

### Branches — GitHub Flow

- `main` sempre estável; cada push nela gera um deploy na Vercel
- Cada funcionalidade em branch própria: `feature/`, `fix/`, `chore/`, `docs/`, `test/`
  (ex.: `feature/dashboard`)
- Integração na `main` por pull request

### Commits — Conventional Commits

```
<tipo>: <descrição no presente>
```

Tipos: `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`, `perf`.
Exemplo: `feat: adiciona validação do formulário de contato`.

### Verificação automática

- **pre-commit:** lint-staged roda ESLint, Prettier e os testes ligados aos arquivos alterados
- **commit-msg:** commitlint rejeita mensagens fora do padrão

## Uso de IA

O projeto foi desenvolvido com apoio do Claude Code. As instruções que a IA segue (stack, arquitetura,
nomenclatura, branches e commits) ficam versionadas em [`CLAUDE.md`](CLAUDE.md).
