import { useContactForm } from '../../hooks/useContactForm'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export function ContactForm() {
  const { register, errors, isSubmitting, status, onSubmit } = useContactForm()

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Input
        id="contato-nome"
        label="nome"
        autoComplete="name"
        error={errors.name?.message}
        {...register('name')}
      />
      <Input
        id="contato-email"
        label="e-mail"
        type="email"
        autoComplete="email"
        placeholder="voce@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        id="contato-mensagem"
        label="mensagem"
        multiline
        rows={6}
        error={errors.message?.message}
        {...register('message')}
      />

      {/* isLoading bloqueia o botão durante o envio: evita mensagens duplicadas */}
      <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'enviando...' : '> enviar mensagem'}
      </Button>

      {status === 'success' && (
        <p role="status" className="text-primary">
          [ OK ] mensagem enviada. Respondo assim que possível.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-danger">
          [ !! ] não foi possível enviar agora. Tente de novo em instantes ou me chame pelo
          LinkedIn.
        </p>
      )}
    </form>
  )
}
