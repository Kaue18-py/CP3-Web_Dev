import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Só cria o cliente se as variáveis existirem, para o site não quebrar quando alguém
// clona o projeto sem preencher o .env (ex.: nos testes ou numa demo sem backend)
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null

export function requireSupabase() {
  if (!supabase) {
    throw new Error(
      'Supabase não configurado: preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env',
    )
  }
  return supabase
}
