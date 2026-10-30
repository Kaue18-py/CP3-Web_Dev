import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fetchPortfolioProjects, GithubApiError } from '../../services/githubService'
import { renderWithProviders } from '../../test/renderWithProviders'
import { ProjectsList } from './ProjectsList'

// Só a busca é falsa; o resto do service (mensagens de erro, classe de erro) é o de verdade
vi.mock('../../services/githubService', async (importOriginal) => ({
  ...(await importOriginal()),
  fetchPortfolioProjects: vi.fn(),
}))

const PROJECTS = [
  {
    name: 'Bot-Discord',
    slug: 'bot-discord',
    description: 'Bot de Discord em Python',
    language: 'Python',
    updatedAt: '2026-10-20T12:00:00Z',
    inDevelopment: true,
  },
  {
    name: 'central-de-consultas',
    slug: 'central-de-consultas',
    description: 'CLI de CEP e cotações',
    language: 'Python',
    updatedAt: '2026-07-27T12:00:00Z',
    inDevelopment: false,
  },
]

describe('ProjectsList', () => {
  beforeEach(() => {
    vi.mocked(fetchPortfolioProjects).mockReset()
  })

  it('mostra skeletons enquanto os projetos carregam', () => {
    vi.mocked(fetchPortfolioProjects).mockReturnValue(new Promise(() => {}))

    renderWithProviders(<ProjectsList />)

    expect(screen.getByRole('status')).toHaveTextContent('carregando projetos')
    expect(screen.getAllByText('carregando...')).toHaveLength(4)
  })

  it('mostra um card por projeto com status, linguagem, data e link', async () => {
    vi.mocked(fetchPortfolioProjects).mockResolvedValue(PROJECTS)

    renderWithProviders(<ProjectsList />)

    expect(await screen.findByText('2 alvos encontrados')).toBeInTheDocument()
    const botLink = screen.getByRole('link', { name: /Bot-Discord/ })
    expect(botLink).toHaveAttribute('href', '/projetos/bot-discord')
    expect(botLink).toHaveTextContent('[ EM DESENVOLVIMENTO ]')
    expect(botLink).toHaveTextContent('atualizado em 20/10/2026')
    expect(screen.getByRole('link', { name: /central-de-consultas/ })).toHaveTextContent(
      '[ CONCLUÍDO ]',
    )
  })

  it('avisa quando não há nenhum projeto', async () => {
    vi.mocked(fetchPortfolioProjects).mockResolvedValue([])

    renderWithProviders(<ProjectsList />)

    expect(await screen.findByText(/nenhum projeto encontrado/)).toBeInTheDocument()
  })

  it('mostra o erro de limite da API e permite tentar de novo', async () => {
    vi.mocked(fetchPortfolioProjects).mockRejectedValueOnce(
      new GithubApiError('limite', { status: 403, isRateLimit: true }),
    )
    vi.mocked(fetchPortfolioProjects).mockResolvedValueOnce(PROJECTS)

    renderWithProviders(<ProjectsList />)

    expect(await screen.findByRole('alert')).toHaveTextContent(/60 por hora/)
    await userEvent.click(screen.getByRole('button', { name: /tentar de novo/ }))

    expect(await screen.findByText('2 alvos encontrados')).toBeInTheDocument()
    expect(fetchPortfolioProjects).toHaveBeenCalledTimes(2)
  })
})
