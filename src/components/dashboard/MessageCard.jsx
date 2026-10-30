import { formatDate } from '../../utils/formatDate'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function MessageCard({ message, onToggleAnswered, isUpdating }) {
  const { id, name, email, message: text, answered, createdAt } = message

  return (
    <Card as="article" title={`msg/${id.slice(0, 8)}`} className={answered ? 'opacity-70' : ''}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-foreground">{name}</h3>
          <a
            href={`mailto:${email}`}
            className="text-sm text-secondary underline-offset-4 hover:underline"
          >
            {email}
          </a>
        </div>
        <span className={`text-xs ${answered ? 'text-primary' : 'text-warning'}`}>
          [ {answered ? 'RESPONDIDA' : 'PENDENTE'} ]
        </span>
      </div>

      <p className="mt-3 leading-relaxed whitespace-pre-wrap">{text}</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>recebida em {formatDate(createdAt)}</span>
        <Button
          variant={answered ? 'ghost' : 'secondary'}
          isLoading={isUpdating}
          onClick={() => onToggleAnswered(id, !answered)}
          className="text-xs"
        >
          {answered ? 'marcar como pendente' : 'marcar como respondida'}
        </Button>
      </div>
    </Card>
  )
}
