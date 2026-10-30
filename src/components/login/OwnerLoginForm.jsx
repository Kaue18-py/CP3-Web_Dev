import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { loginSchema } from '../../schemas/loginSchema'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

// Login do dono do site: autentica no Supabase e, dando certo, vai para o dashboard
export function OwnerLoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setErrorMessage(null)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (error) {
      setErrorMessage(error.message)
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 space-y-4">
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
        {isSubmitting ? 'entrando...' : 'entrar'}
      </Button>
      {errorMessage && (
        <p role="alert" className="text-sm text-danger">
          [ !! ] {errorMessage}
        </p>
      )}
    </form>
  )
}
