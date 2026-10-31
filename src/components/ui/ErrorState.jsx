import { Button } from './Button'
import { Card } from './Card'

export function ErrorState({ source, title, description, onRetry }) {
  return (
    <Card title={`erro: ${source}`}>
      <div role="alert">
        <p className="text-danger">[ !! ] {title}</p>
        {description && <p className="mt-2 text-sm text-muted">{description}</p>}
      </div>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="mt-5">
          &gt; tentar de novo
        </Button>
      )}
    </Card>
  )
}
