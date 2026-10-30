import { Card } from './Card'

// Tela para quando a API responde, mas não tem nada para mostrar
export function EmptyState({ title, children }) {
  return (
    <Card title="resultado: 0">
      <p className="text-warning">[ -- ] {title}</p>
      {children && <p className="mt-2 text-sm text-muted">{children}</p>}
    </Card>
  )
}
