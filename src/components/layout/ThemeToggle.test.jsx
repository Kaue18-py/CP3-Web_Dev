import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../../contexts/ThemeProvider'
import { ThemeToggle } from './ThemeToggle'

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  )
}

describe('tema claro/escuro', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('abre no tema escuro quando não há preferência salva', () => {
    renderToggle()

    expect(document.documentElement).toHaveClass('dark')
    expect(screen.getByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument()
  })

  it('troca para o tema claro e salva a escolha', async () => {
    renderToggle()

    await userEvent.click(screen.getByRole('button', { name: 'Ativar tema claro' }))

    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('abre no tema salvo na visita anterior', () => {
    localStorage.setItem('theme', 'light')

    renderToggle()

    expect(document.documentElement).not.toHaveClass('dark')
    expect(screen.getByRole('button', { name: 'Ativar tema escuro' })).toBeInTheDocument()
  })
})
