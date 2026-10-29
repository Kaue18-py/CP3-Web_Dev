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
