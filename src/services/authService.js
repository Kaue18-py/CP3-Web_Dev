import { requireSupabase, supabase } from './supabaseClient'

function toFriendlyError(error) {
  if (/invalid login credentials/i.test(error.message)) return 'e-mail ou senha incorretos'
  if (/email not confirmed/i.test(error.message)) return 'e-mail ainda não confirmado'
  return 'não foi possível entrar agora. Tente de novo em instantes.'
}

export async function signIn(email, password) {
  const { error } = await requireSupabase().auth.signInWithPassword({ email, password })
  if (error) throw new Error(toFriendlyError(error))
}

export async function signOut() {
  await requireSupabase().auth.signOut()
}

// Sessão atual (ou null). Sem Supabase configurado, devolve null em vez de quebrar.
export async function getCurrentSession() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

// Avisa sempre que o login/logout muda. Devolve uma função para cancelar a assinatura.
export function onAuthChange(callback) {
  if (!supabase) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
  return () => data.subscription.unsubscribe()
}
