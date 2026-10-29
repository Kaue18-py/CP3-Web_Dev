import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'informe o e-mail').email('e-mail inválido'),
  password: z.string().min(6, 'senha com no mínimo 6 caracteres'),
})
