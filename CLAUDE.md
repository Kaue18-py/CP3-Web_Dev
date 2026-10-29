# CLAUDE.md — instruções do projeto para a IA

Portfólio pessoal em React (CP3 FIAP). Leia este arquivo inteiro antes de qualquer alteração.
Todas as regras abaixo são obrigatórias.

## Regras invioláveis

- **Nunca** adicionar assinatura da IA em commits ou PRs: nada de `Co-Authored-By`,
  "Generated with Claude Code" ou similares. Os commits saem só com o nome do autor.
- **Nunca** commitar direto na `main`. Todo trabalho acontece em branch própria (ver "Branches").
- **Nunca** fazer `push`, `merge` ou abrir PR sem pedido explícito do autor.
- **Nunca** versionar `.env`. Toda variável nova entra no `.env.example` (sem valor).
- **Nunca** usar `--no-verify` para pular os hooks. Se o lint ou o commitlint falharem, corrija a causa.
- O autor precisa saber explicar todo o código: prefira soluções simples e explique o que fez.

## Stack

| Área         | Escolha                                                                              |
| ------------ | ------------------------------------------------------------------------------------ |
| Build        | Vite + React 19 (JavaScript, sem TypeScript)                                         |
| Estilo       | Tailwind CSS v4 (dark mode por classe `.dark` no `<html>`)                           |
| Rotas        | React Router (rotas lazy com `React.lazy` + `Suspense`)                              |
| Dados de API | TanStack Query (cache evita requisições repetidas ao GitHub)                         |
| Formulário   | React Hook Form + Zod                                                                |
| Backend      | Supabase (Auth do dashboard, tabelas de mensagens e projetos em destaque)            |
| E-mail       | EmailJS (envio direto do front)                                                      |
| Testes       | Vitest + Testing Library                                                             |
| Qualidade    | ESLint + Prettier, Husky + lint-staged + commitlint                                  |
| Deploy       | Vercel (deploy automático a cada push na `main`; `vercel.json` faz o rewrite da SPA) |

Não adicionar biblioteca nova sem perguntar antes: cada escolha precisa ser justificada pelo autor.

## Identidade visual

Tema **terminal hacker, estilo red team / cyberpunk**. Use sempre as cores pelos tokens do tema
(definidos em `src/index.css`), nunca cores fixas como `text-pink-500` ou `#ff2e88` no componente.

| Token (classe Tailwind)          | Escuro    | Claro     | Uso                                  |
| -------------------------------- | --------- | --------- | ------------------------------------ |
| `background` (`bg-background`)   | `#0b0b12` | `#f5f5fa` | fundo da página                      |
| `surface` (`bg-surface`)         | `#14141f` | `#ffffff` | cards, painéis                       |
| `foreground` (`text-foreground`) | `#e6e6f0` | `#1a1a2e` | texto principal                      |
| `muted` (`text-muted`)           | `#9a9ab3` | `#55556e` | texto secundário                     |
| `primary` (`text-primary`)       | `#ff2e88` | `#c2185b` | destaque principal (magenta), botões |
| `secondary` (`text-secondary`)   | `#00f0ff` | `#00727d` | destaque de apoio (ciano), links     |
| `warning` (`text-warning`)       | `#ffd400` | `#8a5a00` | avisos                               |
| `danger` (`text-danger`)         | `#ff5c5c` | `#c62828` | erros (ex.: validação do formulário) |
| `line` (`border-line`)           | `#2a2a3d` | `#d9d9e6` | bordas                               |

- Todas as combinações de texto passam no contraste WCAG AA (>= 4.5:1). Ao criar cor nova, confira o contraste.
- Fonte: **JetBrains Mono** (auto-hospedada via `@fontsource-variable/jetbrains-mono`) em todo o site.
- Linguagem visual de terminal: prompts (`$`, `>`), colchetes, cursor `█`, bordas finas, cantos pouco arredondados.
- Conceito da home: **varredura nmap**. O hero digita `nmap -sV kaue.dev` e revela a saída linha a
  linha (`useTypewriter` + `useStaggeredReveal`). Portas `open` = tecnologias usadas em projetos,
  `filtered` = em estudo; os projetos do GitHub aparecem como "alvos encontrados".
- O conteúdo do site não copia o README do perfil do GitHub: textos pessoais ficam em `src/data/profile.js`.
- Toda animação respeita `prefers-reduced-motion` e reserva espaço na tela (sem layout shift).
  Não adicionar efeitos pesados (glitch, chuva Matrix, 3D) sem pedir.

## Estrutura de pastas

```
src/
  components/
    ui/        # componentes visuais genéricos e reaproveitados (Button, Card, Input, Skeleton, Spinner)
    layout/    # estrutura das páginas (Header, Footer, Layout)
    <feature>/ # componentes de uma funcionalidade (ex.: projects/ProjectCard.jsx, contact/ContactForm.jsx)
  pages/       # uma página por rota (HomePage, ProjectPage, DashboardPage, NotFoundPage...)
  routes/      # definição das rotas e ProtectedRoute
  services/    # acesso a APIs externas (GitHub, Supabase, EmailJS). Só funções, sem JSX
  hooks/       # hooks personalizados que ligam services ao React (useRepos, useAuth, useTheme)
  contexts/    # Context providers (ThemeContext, AuthContext)
  data/        # conteúdo estático do site (bio, foco de estudos, stack, links)
  schemas/     # schemas Zod de validação
  utils/       # funções puras auxiliares (formatDate...)
  test/        # setup global dos testes
```

## Separação de responsabilidades

- Componentes visuais **não** chamam `fetch`, Supabase ou EmailJS diretamente.
  O fluxo é sempre: `services/` → `hooks/` → componente.
- Componentes pequenos: se um componente passa de ~150 linhas ou faz mais de uma coisa, divida.
- Reaproveite `components/ui/` antes de criar um botão, card ou input novo.
- Todo dado vindo de API precisa tratar os estados de **carregamento**, **erro** e **lista vazia**.
- Imagens: WebP/AVIF, `loading="lazy"`, `width`/`height` definidos (evita layout shift).
- Dashboard e qualquer parte pesada são carregados com `React.lazy`, fora do bundle inicial.

## Convenções de nomenclatura

| Item                  | Padrão                                       | Exemplo                           |
| --------------------- | -------------------------------------------- | --------------------------------- |
| Componentes e páginas | PascalCase, arquivo `.jsx`                   | `ProjectCard.jsx`, `HomePage.jsx` |
| Hooks                 | camelCase começando com `use`, arquivo `.js` | `useRepos.js`                     |
| Services              | camelCase terminando em `Service`            | `githubService.js`                |
| Contexts              | PascalCase terminando em `Context`           | `ThemeContext.jsx`                |
| Schemas Zod           | camelCase terminando em `Schema`             | `contactSchema.js`                |
| Constantes            | UPPER_SNAKE_CASE                             | `GITHUB_API_URL`                  |
| Testes                | mesmo nome do arquivo testado + `.test`      | `ContactForm.test.jsx`            |
| Variáveis de ambiente | prefixo `VITE_`                              | `VITE_SUPABASE_URL`               |

- Um componente por arquivo. Páginas usam `export default` (necessário para `React.lazy`);
  o restante usa export nomeado.
- Código (variáveis, funções) em inglês; textos da interface, commits e documentação em português.

## Branches (GitHub Flow)

- `main` está sempre estável e publicada na Vercel.
- Cada funcionalidade em uma branch criada a partir da `main`:
  `feature/<nome>`, `fix/<nome>`, `chore/<nome>`, `docs/<nome>`, `test/<nome>`
  (ex.: `feature/dashboard`, `feature/formulario-contato`).
- A branch volta para a `main` por pull request.
- Antes de começar uma tarefa, confira em que branch está. Se estiver na `main`, crie a branch certa.

## Commits (Conventional Commits)

Formato: `<tipo>: <descrição>`, em português, verbo no presente da 3ª pessoa, sem ponto final.

| Tipo       | Uso                                         |
| ---------- | ------------------------------------------- |
| `feat`     | nova funcionalidade                         |
| `fix`      | correção de bug                             |
| `refactor` | mudança de código sem alterar comportamento |
| `style`    | formatação, sem mudança de lógica           |
| `test`     | testes                                      |
| `docs`     | documentação                                |
| `chore`    | configuração, dependências, build           |
| `perf`     | melhoria de performance                     |

Exemplos: `feat: adiciona validação do formulário de contato`, `fix: corrige rota 404 ao atualizar a página`.

- Commits pequenos, um assunto por commit.
- O commitlint (hook `commit-msg`) rejeita mensagens fora do padrão.
- O hook `pre-commit` roda ESLint, Prettier e os testes relacionados (`vitest related`) aos arquivos alterados.

## Comandos

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm run lint         # ESLint
npm run format       # Prettier em todo o projeto
npm test             # testes (Vitest)
npm run test:watch   # testes em modo observação
```

## Checklist de requisitos do CP3

Antes de considerar uma funcionalidade pronta, confira se ela atende ao requisito correspondente:

1. Rotas: `/projetos/:slug`, página 404, página de erro da API, refresh/link direto funcionando.
2. Loading, erro e vazio em todo dado de API; skeleton nos cards; botão de envio bloqueado durante o envio.
3. Projetos vindos da API do GitHub (descrição, linguagem, última atualização), com tratamento de rate limit.
4. Formulário: erro específico por campo, envio por e-mail + gravação no Supabase, feedback de sucesso/erro.
5. Dashboard protegido por login: mensagens (marcar como respondida) e seleção de projetos em destaque.
6. Tema claro/escuro persistido no `localStorage`.
7. Responsivo, componentes reaproveitados, identidade visual própria.
8. Lighthouse mobile >= 80, imagens otimizadas e lazy, dashboard lazy, sem layout shift, cache do GitHub.
9. Testes: no mínimo validação do formulário e bloqueio do dashboard sem login.
