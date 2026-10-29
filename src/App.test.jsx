import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from './App'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  it('renderiza a home na rota /', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kauê')
  })

  it('mostra as seções da home e os links de contato', () => {
    renderAt('/')

    expect(screen.getByRole('region', { name: '> cat ~/.plan' })).toBeInTheDocument()
    // a varredura nmap tem uma versão em texto para leitores de tela
    expect(screen.getByText('Resultado da varredura em kaue.dev:')).toBeInTheDocument()
    expect(
      screen.getByText(/React · Tailwind — interfaces web \(uso em projetos\)/),
    ).toBeInTheDocument()

    for (const name of ['LinkedIn', 'GitHub', 'Instagram']) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('target', '_blank')
    }
  })

  it('mostra a página 404 em uma rota inexistente', async () => {
    renderAt('/rota-que-nao-existe')

    // a página 404 é carregada sob demanda, por isso o findBy (espera aparecer)
    expect(await screen.findByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(screen.getByText('/rota-que-nao-existe')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar para a home/i })).toHaveAttribute('href', '/')
  })
})
