import { Link } from 'react-router'
import { PROFILE } from '../../data/profile'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-sm font-semibold" aria-label="Ir para a página inicial">
          <span className="text-primary">{PROFILE.username}</span>
          <span className="text-muted">@</span>
          <span className="text-secondary">portfolio</span>
          <span className="text-muted">:~$</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
