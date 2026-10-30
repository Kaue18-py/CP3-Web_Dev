import {
  describeGithubError,
  fetchPortfolioProjects,
  fetchProjectReadme,
  GithubApiError,
} from './githubService'

// Resposta falsa no formato do fetch: os testes nunca chamam o GitHub de verdade
function fakeResponse({ status = 200, body = null, text = '', headers = {} } = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(headers),
    json: async () => body,
    text: async () => text,
  }
}

function repo(overrides) {
  return {
    name: 'Repo',
    description: 'descrição',
    language: 'Python',
    pushed_at: '2026-10-29T15:00:00Z',
    html_url: 'https://github.com/Kaue18-py/Repo',
    homepage: '',
    stargazers_count: 0,
    fork: false,
    topics: [],
    ...overrides,
  }
}

describe('githubService', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('traz só os repositórios próprios com a etiqueta portfolio', async () => {
    const fetchMock = vi.fn(async () =>
      fakeResponse({
        body: [
          repo({ name: 'Bot-Discord', topics: ['portfolio', 'em-desenvolvimento'] }),
          repo({ name: 'central-de-consultas', topics: ['portfolio'] }),
          repo({ name: 'MetFlix', topics: [] }),
          repo({ name: 'Fork-Alheio', fork: true, topics: ['portfolio'] }),
        ],
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const projects = await fetchPortfolioProjects()

    expect(projects.map((project) => project.name)).toEqual(['Bot-Discord', 'central-de-consultas'])
    expect(projects[0]).toMatchObject({ slug: 'bot-discord', inDevelopment: true })
    expect(projects[1]).toMatchObject({ slug: 'central-de-consultas', inDevelopment: false })
    expect(fetchMock.mock.calls[0][0]).toContain('/users/Kaue18-py/repos')
  })

  it('identifica quando o limite de requisições do GitHub acabou', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        fakeResponse({
          status: 403,
          headers: { 'x-ratelimit-remaining': '0', 'x-ratelimit-reset': '1793376000' },
        }),
      ),
    )

    const error = await fetchPortfolioProjects().catch((caught) => caught)

    expect(error).toBeInstanceOf(GithubApiError)
    expect(error.isRateLimit).toBe(true)
    expect(error.resetAt).toBeInstanceOf(Date)
    expect(describeGithubError(error)).toMatch(/60 por hora/)
  })

  it('devolve o README em HTML com as imagens em carregamento preguiçoso', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => fakeResponse({ text: '<h1>Título</h1><img src="a.png">' })),
    )

    expect(await fetchProjectReadme('Repo')).toBe('<h1>Título</h1><img loading="lazy" src="a.png">')
  })

  it('devolve null quando o repositório não tem README', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => fakeResponse({ status: 404 })),
    )

    expect(await fetchProjectReadme('Repo')).toBeNull()
  })
})
