import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router'
import { fetchPortfolioProjects, fetchProjectReadme } from '../services/githubService'
import { renderWithProviders } from '../test/renderWithProviders'
import ProjectPage from './ProjectPage'

vi.mock('../services/githubService', async (importOriginal) => ({
  ...(await importOriginal()),
  fetchPortfolioProjects: vi.fn(),
  fetchProjectReadme: vi.fn(),
}))

const BOT = {
  name: 'Bot-Discord',
  slug: 'bot-discord',
  description: 'Bot de Discord em Python',
  language: 'Python',
  updatedAt: '2026-10-20T12:00:00Z',
  url: 'https://github.com/Kaue18-py/Bot-Discord',
  homepage: null,
  inDevelopment: true,
}

function renderProjectPage(slug) {
  return renderWithProviders(
    <Routes>
      <Route path="/projetos/:slug" element={<ProjectPage />} />
    </Routes>,
    { route: `/projetos/${slug}` },
  )
}

describe('ProjectPage', () => {
  beforeEach(() => {
    vi.mocked(fetchPortfolioProjects).mockReset()
    vi.mocked(fetchProjectReadme).mockReset()
  })

  it('mostra os dados do projeto e o README vindo do GitHub', async () => {
    vi.mocked(fetchPortfolioProjects).mockResolvedValue([BOT])
    vi.mocked(fetchProjectReadme).mockResolvedValue('<h2>Comandos</h2><p>!ola e !dado</p>')

    renderProjectPage('bot-discord')

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Bot-Discord')
    expect(screen.getByText('[ EM DESENVOLVIMENTO ]')).toBeInTheDocument()
    expect(screen.getByText(/ainda não está 100% completo/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver código no GitHub/ })).toHaveAttribute(
      'href',
      BOT.url,
    )
    expect(await screen.findByRole('heading', { name: 'Comandos' })).toBeInTheDocument()
    expect(fetchProjectReadme).toHaveBeenCalledWith('Bot-Discord')
  })

  it('avisa quando o projeto do link não existe', async () => {
    vi.mocked(fetchPortfolioProjects).mockResolvedValue([BOT])

    renderProjectPage('projeto-fantasma')

    expect(await screen.findByText(/projeto "projeto-fantasma" não encontrado/)).toBeInTheDocument()
    expect(fetchProjectReadme).not.toHaveBeenCalled()
  })

  it('avisa quando o repositório não tem README', async () => {
    vi.mocked(fetchPortfolioProjects).mockResolvedValue([BOT])
    vi.mocked(fetchProjectReadme).mockResolvedValue(null)

    renderProjectPage('bot-discord')

    expect(await screen.findByText(/ainda não tem README/)).toBeInTheDocument()
  })
})
