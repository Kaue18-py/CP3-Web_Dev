import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchFeaturedSlugs, setProjectFeatured } from '../services/featuredService'

export function useFeaturedSlugs() {
  return useQuery({ queryKey: ['featured'], queryFn: fetchFeaturedSlugs })
}

// Liga/desliga o destaque e atualiza o cache: a página inicial já mostra a mudança
export function useToggleFeatured() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ slug, featured }) => setProjectFeatured(slug, featured),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['featured'] }),
  })
}
