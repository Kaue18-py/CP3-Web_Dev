const GITHUB_API_URL = 'https://api.github.com'
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'Kaue18-py'

// Etiquetas (topics) colocadas nos repositórios do GitHub: a seleção fica no GitHub, não no código
export const PORTFOLIO_TOPIC = 'portfolio'
export const IN_DEVELOPMENT_TOPIC = 'em-desenvolvimento'

export class GithubApiError extends Error {
  constructor(message, { status = null, isRateLimit = false, resetAt = null } = {}) {
    super(message)
    this.name = 'GithubApiError'
    this.status = status
    this.isRateLimit = isRateLimit
    this.resetAt = resetAt
  }
}

async function request(path, { accept = 'application/vnd.github+json' } = {}) {
  let response
  try {
    response = await fetch(`${GITHUB_API_URL}${path}`, { headers: { Accept: accept } })
  } catch {
    throw new GithubApiError('Sem conexão com a API do GitHub')
  }

  if (response.ok) return response

  // Sem login, o GitHub aceita 60 requisições por hora; quando acaba, avisa nesses cabeçalhos
  const isRateLimit =
    (response.status === 403 || response.status === 429) &&
    response.headers.get('x-ratelimit-remaining') === '0'
  if (isRateLimit) {
    const reset = Number(response.headers.get('x-ratelimit-reset'))
    throw new GithubApiError('Limite de requisições da API do GitHub atingido', {
      status: response.status,
      isRateLimit: true,
      resetAt: reset ? new Date(reset * 1000) : null,
    })
  }

  throw new GithubApiError(`A API do GitHub respondeu com erro ${response.status}`, {
    status: response.status,
  })
}

function toProject(repo) {
  return {
    name: repo.name,
    slug: repo.name.toLowerCase(),
    description: repo.description,
    language: repo.language,
    updatedAt: repo.pushed_at,
    url: repo.html_url,
    homepage: repo.homepage || null,
    stars: repo.stargazers_count,
    inDevelopment: repo.topics.includes(IN_DEVELOPMENT_TOPIC),
  }
}

export async function fetchPortfolioProjects() {
  const response = await request(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`)
  const repos = await response.json()
  return repos.filter((repo) => !repo.fork && repo.topics?.includes(PORTFOLIO_TOPIC)).map(toProject)
}

// README do repositório já convertido em HTML pelo próprio GitHub. Retorna null se não existir.
export async function fetchProjectReadme(name) {
  try {
    const response = await request(`/repos/${GITHUB_USERNAME}/${name}/readme`, {
      accept: 'application/vnd.github.html+json',
    })
    const html = await response.text()
    // imagens do README só carregam quando aparecem na tela
    return html.replaceAll('<img ', '<img loading="lazy" ')
  } catch (error) {
    if (error.status === 404) return null
    throw error
  }
}

export function describeGithubError(error) {
  if (error?.isRateLimit) {
    const time = error.resetAt?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    return `O GitHub limita os acessos sem login a 60 por hora. Tente de novo ${
      time ? `depois das ${time}` : 'em alguns minutos'
    }.`
  }
  return 'Verifique sua conexão e tente de novo.'
}
