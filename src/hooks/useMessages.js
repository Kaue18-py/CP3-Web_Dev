import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMessages, setMessageAnswered } from '../services/messagesService'

// Mensagens recebidas pelo formulário. staleTime 0: ao abrir o dashboard, sempre busca o que há de novo.
export function useMessages() {
  return useQuery({ queryKey: ['messages'], queryFn: fetchMessages, staleTime: 0 })
}

// Marca/desmarca "respondida" e atualiza a lista em cache ao terminar
export function useToggleAnswered() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, answered }) => setMessageAnswered(id, answered),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  })
}
