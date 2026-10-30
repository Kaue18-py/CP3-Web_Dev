import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { renderWithProviders } from './test/renderWithProviders'

// a página inicial mostra os destaques, que usam a lista de projetos: nada de chamar o GitHub de verdade
vi.mock('./services/githubService', async (importOriginal) => ({
  ...(await importOriginal()),
  fetchPortfolioProjects: vi.fn(async () => []),
}))

function renderAt(path) {
  return renderWithProviders(<App />, { route: path })
}

describe('App', () => {
  it('abre na tela de login', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1, name: 'hello, friend.' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /acessar como convidado/i })).toBeInTheDocument()
  })

  it('deixa o visitante entrar como convidado e navegar pelo menu', async () => {
    renderAt('/')

    await userEvent.click(screen.getByRole('button', { name: /acessar como convidado/i }))

    expect(await screen.findByRole('heading', { name: 'ACESSO CONCEDIDO' })).toBeInTheDocument()
    const menu = screen.getByRole('navigation', { name: 'Menu do portfólio' })
    expect(menu).toHaveTextContent('sobre')
    expect(menu).toHaveTextContent('projetos')
  })

  it('abre um link compartilhado direto na página, sem passar pelo login', async () => {
    renderAt('/sobre')

    expect(await screen.findByRole('region', { name: '> cat ~/.plan' })).toBeInTheDocument()
    expect(screen.getByText(/criptografia · redes · autenticação/)).toBeInTheDocument()
    expect(screen.queryByText(/linux/i)).not.toBeInTheDocument()
  })

  it('valida os campos do login do dono', async () => {
    renderAt('/')
    await userEvent.click(screen.getByText('acesso restrito (dono do site)'))

    await userEvent.type(await screen.findByLabelText(/login/), 'email-errado')
    await userEvent.click(screen.getByRole('button', { name: 'entrar' }))

    expect(await screen.findByText(/e-mail inválido/)).toBeInTheDocument()
    expect(screen.getByText(/senha com no mínimo 6 caracteres/)).toBeInTheDocument()
  })

  it('mostra a página 404 em uma rota inexistente', async () => {
    renderAt('/rota-que-nao-existe')

    // a página 404 é carregada sob demanda, por isso o findBy (espera aparecer)
    expect(await screen.findByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(screen.getByText('/rota-que-nao-existe')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar para o início/i })).toHaveAttribute(
      'href',
      '/inicio',
    )
  })
})
