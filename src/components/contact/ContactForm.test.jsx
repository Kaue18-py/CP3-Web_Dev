import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { sendContactMessage } from '../../services/contactService'
import { ContactForm } from './ContactForm'

// O teste não manda e-mail de verdade: o service é substituído por uma função falsa
vi.mock('../../services/contactService', () => ({ sendContactMessage: vi.fn() }))

const VALID_MESSAGE = 'Olá, Kauê! Vi seu portfólio e quero conversar.'

async function fillForm({ name = 'Ana', email = 'ana@email.com', message = VALID_MESSAGE } = {}) {
  if (name) await userEvent.type(screen.getByLabelText(/nome/), name)
  if (email) await userEvent.type(screen.getByLabelText(/e-mail/), email)
  if (message) await userEvent.type(screen.getByLabelText(/mensagem/), message)
}

describe('ContactForm', () => {
  // com chaves: se o beforeEach retornar uma função (o mockReset retorna o mock),
  // o Vitest a executa como limpeza no fim do teste
  beforeEach(() => {
    vi.mocked(sendContactMessage).mockReset()
  })

  it('mostra uma mensagem de erro específica para cada campo', async () => {
    render(<ContactForm />)

    await userEvent.click(screen.getByRole('button', { name: /enviar mensagem/ }))

    expect(await screen.findByText(/nome com no mínimo 2 caracteres/)).toBeInTheDocument()
    expect(screen.getByText(/informe o e-mail/)).toBeInTheDocument()
    expect(screen.getByText(/mensagem com no mínimo 20 caracteres/)).toBeInTheDocument()
    expect(sendContactMessage).not.toHaveBeenCalled()
  })

  it('recusa e-mail inválido e mensagem curta', async () => {
    render(<ContactForm />)
    await fillForm({ email: 'ana@', message: 'curta' })

    await userEvent.click(screen.getByRole('button', { name: /enviar mensagem/ }))

    expect(await screen.findByText(/e-mail inválido/)).toBeInTheDocument()
    expect(screen.getByText(/mensagem com no mínimo 20 caracteres/)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/)).toHaveAttribute('aria-invalid', 'true')
  })

  it('bloqueia o botão durante o envio e mostra sucesso no final', async () => {
    let finishSending
    vi.mocked(sendContactMessage).mockReturnValue(
      new Promise((resolve) => {
        finishSending = resolve
      }),
    )
    render(<ContactForm />)
    await fillForm()

    await userEvent.click(screen.getByRole('button', { name: /enviar mensagem/ }))

    expect(await screen.findByRole('button', { name: /enviando/ })).toBeDisabled()
    expect(sendContactMessage).toHaveBeenCalledWith({
      name: 'Ana',
      email: 'ana@email.com',
      message: VALID_MESSAGE,
    })

    finishSending()
    expect(await screen.findByRole('status')).toHaveTextContent('mensagem enviada')
    expect(screen.getByLabelText(/nome/)).toHaveValue('')
  })

  it('mostra erro quando o envio falha', async () => {
    vi.mocked(sendContactMessage).mockRejectedValue(new Error('falha de rede'))
    render(<ContactForm />)
    await fillForm()

    await userEvent.click(screen.getByRole('button', { name: /enviar mensagem/ }))

    expect(await screen.findByRole('alert')).toHaveTextContent('não foi possível enviar')
  })
})
