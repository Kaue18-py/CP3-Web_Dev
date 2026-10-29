const VARIANTS = {
  primary: 'border-primary bg-primary text-background hover:bg-transparent hover:text-primary',
  secondary: 'border-secondary text-secondary hover:bg-secondary hover:text-background',
  ghost: 'border-transparent text-muted hover:text-foreground',
}

export function Button({
  variant = 'primary',
  isLoading = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:pointer-events-none disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {isLoading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
        />
      )}
      {children}
    </button>
  )
}
