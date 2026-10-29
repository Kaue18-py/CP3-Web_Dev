import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// Envia a mensagem de contato para o e-mail do dono do site.
// O template no EmailJS usa as variáveis {{name}}, {{email}} e {{message}}.
export async function sendContactEmail({ name, email, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('Envio de e-mail não configurado: preencha as variáveis do EmailJS no .env')
  }

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, { name, email, message }, { publicKey: PUBLIC_KEY })
}
