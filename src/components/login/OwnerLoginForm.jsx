import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../../schemas/loginSchema'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

// Login do dono do site. A autenticação de verdade (Supabase) entra junto com o dashboard.
export function OwnerLoginForm() {
  const [status, setStatus] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  async function onSubmit() {
    setStatus('módulo de autenticação ainda não configurado')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-4">
      <Input
        id="login-email"
        label="login"
        type="email"
        autoComplete="email"
        placeholder="voce@email.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        id="login-senha"
        label="senha"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" variant="secondary" isLoading={isSubmitting} className="w-full">
        entrar
      </Button>
      {status && (
        <p role="status" className="text-sm text-warning">
          [ !! ] {status}
        </p>
      )}
    </form>
  )
}
