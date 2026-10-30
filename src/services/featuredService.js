import { getSupabase, requireSupabase } from './supabaseClient'

// Slugs dos projetos marcados como destaque no dashboard (qualquer visitante pode ler).
// Sem Supabase configurado, simplesmente não há destaques.
export async function fetchFeaturedSlugs() {
  const supabase = getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase.from('featured_projects').select('slug')
  if (error) throw new Error(error.message)
  return data.map((row) => row.slug)
}

// Marca ou desmarca um projeto como destaque (só o dono logado pode)
export async function setProjectFeatured(slug, featured) {
  const table = requireSupabase().from('featured_projects')
  const { error } = featured ? await table.insert({ slug }) : await table.delete().eq('slug', slug)
  if (error) throw new Error(error.message)
}
