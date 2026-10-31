import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { getCurrentSession } from '../services/authService'
import { fetchFeaturedSlugs, setProjectFeatured } from '../services/featuredService'
import { fetchPortfolioProjects } from '../services/githubService'
import { fetchMessages, setMessageAnswered } from '../services/messagesService'
import { renderWithProviders } from '../test/renderWithProviders'

vi.mock('../services/authService', () => ({
  getCurrentSession: vi.fn(),
  onAuthChange: vi.fn(() => () => {}),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))
vi.mock('../services/messagesService', () => ({
  fetchMessages: vi.fn(),
  setMessageAnswered: vi.fn(),
}))
// o dashboard também lista os projetos (GitHub) e os destaques (Supabase): tudo falso nos testes
vi.mock('../services/githubService', async (importOriginal) => ({
  ...(await importOriginal()),
  fetchPortfolioProjects: vi.fn(),
}))
vi.mock('../services/featuredService', () => ({
  fetchFeaturedSlugs: vi.fn(),
  setProjectFeatured: vi.fn(),
}))

const PROJECTS = [
  {
    name: 'Bot-Discord',
    slug: 'bot-discord',
    description: 'Bot',
    language: 'Python',
    updatedAt: '2026-10-20T12:00:00Z',
    inDevelopment: true,
  },
]

const MESSAGES = [
  {
    id: '11111111-aaaa',
    name: 'Ana',
    email: 'ana@email.com',
    message: 'Tenho uma vaga pra você',
    answered: false,
    createdAt: '2026-10-30T12:00:00Z',
  },
]

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.mocked(getCurrentSession).mockReset()
    vi.mocked(fetchMessages).mockReset()
    vi.mocked(setMessageAnswered).mockReset()
    vi.mocked(setProjectFeatured).mockReset()
    vi.mocked(fetchPortfolioProjects).mockResolvedValue(PROJECTS)
    vi.mocked(fetchFeaturedSlugs).mockResolvedValue([])
  })

  it('bloqueia o dashboard e manda para o login quando não há sessão', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue(null)

    renderWithProviders(<App />, { route: '/dashboard' })

    expect(
      await screen.findByRole('heading', { level: 1, name: 'hello, friend.' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /dashboard/i })).not.toBeInTheDocument()
    expect(fetchMessages).not.toHaveBeenCalled()
  })

  it('mostra as mensagens quando o dono está logado', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue({ user: { email: 'kaue@redteam.dev' } })
    vi.mocked(fetchMessages).mockResolvedValue(MESSAGES)

    renderWithProviders(<App />, { route: '/dashboard' })

    expect(await screen.findByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
    expect(await screen.findByText('Tenho uma vaga pra você')).toBeInTheDocument()
    expect(screen.getByText(/1 mensagens/)).toBeInTheDocument()
  })

  it('marca uma mensagem como respondida', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue({ user: { email: 'kaue@redteam.dev' } })
    vi.mocked(fetchMessages).mockResolvedValue(MESSAGES)
    vi.mocked(setMessageAnswered).mockResolvedValue(undefined)

    renderWithProviders(<App />, { route: '/dashboard' })

    const button = await screen.findByRole('button', { name: /marcar como respondida/ })
    await userEvent.click(button)

    await waitFor(() => expect(setMessageAnswered).toHaveBeenCalledWith('11111111-aaaa', true))
  })

  it('coloca um projeto em destaque', async () => {
    vi.mocked(getCurrentSession).mockResolvedValue({ user: { email: 'kaue@redteam.dev' } })
    vi.mocked(fetchMessages).mockResolvedValue([])
    vi.mocked(setProjectFeatured).mockResolvedValue(undefined)

    renderWithProviders(<App />, { route: '/dashboard' })

    const button = await screen.findByRole('button', { name: 'Colocar Bot-Discord em destaque' })
    await userEvent.click(button)

    await waitFor(() => expect(setProjectFeatured).toHaveBeenCalledWith('bot-discord', true))
  })
})
