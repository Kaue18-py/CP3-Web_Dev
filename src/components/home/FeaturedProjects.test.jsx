import { screen } from '@testing-library/react'
import { fetchFeaturedSlugs } from '../../services/featuredService'
import { fetchPortfolioProjects } from '../../services/githubService'
import { renderWithProviders } from '../../test/renderWithProviders'
import { FeaturedProjects } from './FeaturedProjects'

vi.mock('../../services/githubService', async (importOriginal) => ({
  ...(await importOriginal()),
  fetchPortfolioProjects: vi.fn(),
}))
vi.mock('../../services/featuredService', () => ({ fetchFeaturedSlugs: vi.fn() }))

const PROJECTS = [
  {
    name: 'Bot-Discord',
    slug: 'bot-discord',
    description: 'Bot',
    language: 'Python',
    updatedAt: '2026-10-20T12:00:00Z',
    inDevelopment: true,
  },
  {
    name: 'central-de-consultas',
    slug: 'central-de-consultas',
    description: 'CLI',
    language: 'Python',
    updatedAt: '2026-07-27T12:00:00Z',
    inDevelopment: false,
  },
]

describe('FeaturedProjects', () => {
  beforeEach(() => {
    vi.mocked(fetchPortfolioProjects).mockResolvedValue(PROJECTS)
  })

  it('mostra só os projetos marcados como destaque', async () => {
    vi.mocked(fetchFeaturedSlugs).mockResolvedValue(['central-de-consultas'])

    renderWithProviders(<FeaturedProjects />)

    expect(await screen.findByRole('link', { name: /central-de-consultas/ })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Bot-Discord/ })).not.toBeInTheDocument()
  })

  it('avisa quando nenhum destaque foi escolhido', async () => {
    vi.mocked(fetchFeaturedSlugs).mockResolvedValue([])

    renderWithProviders(<FeaturedProjects />)

    expect(await screen.findByText(/nenhum destaque selecionado/)).toBeInTheDocument()
  })
})
