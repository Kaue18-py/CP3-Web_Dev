import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'nome com no mínimo 2 caracteres'),
  email: z.string().trim().min(1, 'informe o e-mail').email('e-mail inválido'),
  message: z
    .string()
    .trim()
    .min(20, 'mensagem com no mínimo 20 caracteres')
    .max(2000, 'mensagem com no máximo 2000 caracteres'),
})
