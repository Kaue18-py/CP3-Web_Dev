import { Link, NavLink } from 'react-router'
import { NAV_ITEMS } from '../../data/navigation'
import { PROFILE } from '../../data/profile'
import { ButtonLink } from '../ui/ButtonLink'
import { ThemeToggle } from './ThemeToggle'

function navLinkClass({ isActive }) {
  return `rounded-sm px-2 py-1 text-sm transition-colors ${
    isActive ? 'text-primary dark:text-glow' : 'text-muted hover:text-foreground'
  }`
}

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
        <Link to="/inicio" className="text-sm font-semibold" aria-label="Ir para o início">
          <span className="text-primary">{PROFILE.username}</span>
          <span className="text-muted">@</span>
          <span className="text-secondary">{PROFILE.host}</span>
          <span className="text-muted">:~$</span>
        </Link>

        {/* No celular o menu desce para uma segunda linha; no desktop fica no meio */}
        <nav aria-label="Navegação principal" className="order-last w-full sm:order-none sm:w-auto">
          <ul className="flex flex-wrap gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass}>
                  ./{item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <ButtonLink to="/" variant="ghost" className="px-2">
            [ sair ]
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
