import { Card } from './Card'

export function EmptyState({ title, children }) {
  return (
    <Card title="resultado: 0">
      <p className="text-warning">[ -- ] {title}</p>
      {children && <p className="mt-2 text-sm text-muted">{children}</p>}
    </Card>
  )
}
