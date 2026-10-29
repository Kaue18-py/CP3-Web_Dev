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

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kaue')
  })

  it('mostra a página 404 em uma rota inexistente', async () => {
    renderAt('/rota-que-nao-existe')

    // a página 404 é carregada sob demanda, por isso o findBy (espera aparecer)
    expect(await screen.findByRole('heading', { name: '404' })).toBeInTheDocument()
    expect(screen.getByText('/rota-que-nao-existe')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar para a home/i })).toHaveAttribute('href', '/')
  })
})
