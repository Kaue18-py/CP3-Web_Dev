import { EmptyState } from '../ui/EmptyState'
import { ErrorState } from '../ui/ErrorState'
import { Skeleton } from '../ui/Skeleton'
import { useMessages, useToggleAnswered } from '../../hooks/useMessages'
import { MessageCard } from './MessageCard'

export function DashboardMessages() {
  const { data: messages, isPending, isError, refetch } = useMessages()
  const toggle = useToggleAnswered()

  if (isPending) {
    return (
      <div className="space-y-4">
        <p className="sr-only" role="status">
          carregando mensagens
        </p>
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorState
        source="supabase"
        title="falha ao carregar as mensagens"
        description="Verifique sua conexão e tente de novo."
        onRetry={() => refetch()}
      />
    )
  }

  if (messages.length === 0) {
    return (
      <EmptyState title="nenhuma mensagem ainda">
        As mensagens do formulário aparecem aqui.
      </EmptyState>
    )
  }

  const pending = messages.filter((message) => !message.answered).length

  return (
    <>
      <p className="mb-4 text-sm text-muted">
        <span className="text-primary">[ OK ]</span> {messages.length} mensagens ·{' '}
        <span className="text-warning">{pending} pendentes</span>
      </p>
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message.id}>
            <MessageCard
              message={message}
              onToggleAnswered={(id, answered) => toggle.mutate({ id, answered })}
              isUpdating={toggle.isPending && toggle.variables?.id === message.id}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
