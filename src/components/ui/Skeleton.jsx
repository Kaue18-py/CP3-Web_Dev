// Bloco cinza pulsante que ocupa o lugar do conteúdo enquanto ele carrega
export function Skeleton({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-sm bg-line motion-reduce:animate-none ${className}`}
    />
  )
}
