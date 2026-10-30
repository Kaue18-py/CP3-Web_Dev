import { useQuery } from '@tanstack/react-query'
import { fetchPortfolioProjects } from '../services/githubService'

// Lista de projetos. A chave ['projects'] é o "endereço" no cache: todas as páginas que usam
// este hook compartilham a mesma resposta, sem repetir a requisição ao GitHub.
export function useProjects() {
  return useQuery({ queryKey: ['projects'], queryFn: fetchPortfolioProjects })
}
