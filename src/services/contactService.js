import { sendContactEmail } from './emailService'
import { saveMessage } from './messagesService'

// Envio do formulário de contato: avisa o dono por e-mail (EmailJS) E guarda a mensagem
// no banco (Supabase) para aparecer no dashboard. Os dois acontecem juntos.
export async function sendContactMessage(data) {
  await Promise.all([sendContactEmail(data), saveMessage(data)])
}
