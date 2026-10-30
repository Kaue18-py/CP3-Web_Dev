import { useQuery } from '@tanstack/react-query'
import { fetchPortfolioProjects } from '../services/githubService'

// Um projeto pelo slug. Usa a mesma chave ['projects'] da lista: se a lista já foi carregada,
// a página do projeto abre na hora, sem nova requisição. O `select` só escolhe o item da lista.
export function useProject(slug) {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchPortfolioProjects,
    select: (projects) => projects.find((project) => project.slug === slug) ?? null,
  })
}
