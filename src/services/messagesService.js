import { requireSupabase } from './supabaseClient'

function toMessage(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    answered: row.answered,
    createdAt: row.created_at,
  }
}

// Grava a mensagem do formulário de contato (qualquer visitante pode inserir — RLS permite)
export async function saveMessage({ name, email, message }) {
  const { error } = await requireSupabase().from('messages').insert({ name, email, message })
  if (error) throw new Error(error.message)
}

// Lista as mensagens recebidas, da mais recente para a mais antiga (só o dono logado lê)
export async function fetchMessages() {
  const { data, error } = await requireSupabase()
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data.map(toMessage)
}

// Marca uma mensagem como respondida ou não (só o dono logado atualiza)
export async function setMessageAnswered(id, answered) {
  const { error } = await requireSupabase().from('messages').update({ answered }).eq('id', id)
  if (error) throw new Error(error.message)
}
