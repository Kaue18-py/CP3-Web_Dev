import { QueryClient } from '@tanstack/react-query'

const TEN_MINUTES = 10 * 60 * 1000

// Cache das respostas de API compartilhado pelo site inteiro
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Por 10 minutos a resposta é considerada atual: navegar entre páginas não refaz a requisição
      staleTime: TEN_MINUTES,
      gcTime: 3 * TEN_MINUTES,
      refetchOnWindowFocus: false,
      // Tenta de novo em falhas passageiras, mas não insiste se o limite da API do GitHub acabou
      retry: (failureCount, error) => !error?.isRateLimit && failureCount < 2,
    },
  },
})
