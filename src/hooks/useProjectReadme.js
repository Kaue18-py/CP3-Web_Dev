import { useQuery } from '@tanstack/react-query'
import { fetchProjectReadme } from '../services/githubService'

// README de um repositório, guardado no cache por nome (abrir o mesmo projeto de novo não refaz a requisição)
export function useProjectReadme(name) {
  return useQuery({
    queryKey: ['readme', name],
    queryFn: () => fetchProjectReadme(name),
    enabled: Boolean(name),
  })
}
