import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('chama o onClick ao ser clicado', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Enviar</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('fica bloqueado e não dispara clique enquanto carrega', async () => {
    const handleClick = vi.fn()
    render(
      <Button isLoading onClick={handleClick}>
        Enviar
      </Button>,
    )
    const button = screen.getByRole('button', { name: 'Enviar' })

    await userEvent.click(button)

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(handleClick).not.toHaveBeenCalled()
  })
})
