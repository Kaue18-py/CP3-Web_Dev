# Portfólio — CP3 Web Dev

Site de portfólio pessoal feito em React. Os projetos são carregados direto da API do GitHub,
e um dashboard protegido por login mostra as mensagens recebidas pelo formulário de contato e define
os projetos em destaque na home.

> 🔗 Site publicado: _em breve_

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
cp .env.example .env   # preencha as variáveis
npm run dev
```

### Variáveis de ambiente

| Variável                   | Descrição                                             |
| -------------------------- | ----------------------------------------------------- |
| `VITE_GITHUB_USERNAME`     | usuário do GitHub cujos repositórios aparecem no site |
| `VITE_SUPABASE_URL`        | URL do projeto no Supabase                            |
| `VITE_SUPABASE_ANON_KEY`   | chave pública (anon) do Supabase                      |
| `VITE_EMAILJS_SERVICE_ID`  | ID do serviço de e-mail no EmailJS                    |
| `VITE_EMAILJS_TEMPLATE_ID` | ID do template de e-mail no EmailJS                   |
| `VITE_EMAILJS_PUBLIC_KEY`  | chave pública do EmailJS                              |

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

- **pre-commit:** lint-staged roda ESLint e Prettier nos arquivos alterados
- **commit-msg:** commitlint rejeita mensagens fora do padrão

## Uso de IA

O projeto foi desenvolvido com apoio do Claude Code. As instruções que a IA segue (stack, arquitetura,
nomenclatura, branches e commits) ficam versionadas em [`CLAUDE.md`](CLAUDE.md).
