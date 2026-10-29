import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { contactSchema } from '../schemas/contactSchema'
import { sendContactMessage } from '../services/contactService'

// Lógica do formulário de contato (validação, envio e resultado), separada da tela
export function useContactForm() {
  const [status, setStatus] = useState('idle') // idle | success | error
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus('idle')
    try {
      await sendContactMessage(data)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  })

  return {
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    status,
    onSubmit,
  }
}
