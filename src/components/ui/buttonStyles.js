const VARIANTS = {
  primary: 'border-primary bg-primary text-background hover:bg-transparent hover:text-primary',
  secondary: 'border-secondary text-secondary hover:bg-secondary hover:text-background',
  ghost: 'border-transparent text-muted hover:text-foreground',
}

// Classes compartilhadas por Button e ButtonLink, para os dois terem exatamente o mesmo visual
export function buttonStyles(variant = 'primary', className = '') {
  return `inline-flex items-center justify-center gap-2 rounded-sm border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:pointer-events-none disabled:opacity-60 ${VARIANTS[variant]} ${className}`
}
