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
})
