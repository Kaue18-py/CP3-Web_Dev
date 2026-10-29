import { sendContactEmail } from './emailService'

// Ponto único de envio do formulário de contato.
// Próxima etapa: além do e-mail, gravar a mensagem no Supabase para aparecer no dashboard.
export async function sendContactMessage(data) {
  await sendContactEmail(data)
}
