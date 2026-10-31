export function Skeleton({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-sm bg-line motion-reduce:animate-none ${className}`}
    />
  )
}
