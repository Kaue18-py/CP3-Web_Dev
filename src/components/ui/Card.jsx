export function Card({ title, as: Component = 'article', className = '', children }) {
  return (
    <Component className={`overflow-hidden rounded-sm border border-line bg-surface ${className}`}>
      {title && (
        <header className="flex items-center gap-2 border-b border-line px-4 py-2 text-xs text-muted">
          <span aria-hidden="true" className="text-primary">
            ●
          </span>
          <span className="truncate">{title}</span>
        </header>
      )}
      <div className="p-4">{children}</div>
    </Component>
  )
}
