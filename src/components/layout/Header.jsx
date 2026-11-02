import { Link, NavLink, useNavigate } from 'react-router'
import { NAV_ITEMS } from '../../data/navigation'
import { PROFILE } from '../../data/profile'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'
import { ThemeToggle } from './ThemeToggle'

function navLinkClass({ isActive }) {
  return `rounded-sm px-2 py-1 text-sm transition-colors ${
    isActive ? 'text-primary dark:text-glow' : 'text-muted hover:text-foreground'
  }`
}

export function Header() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  // sem o logout, o dono voltaria ao login com a sessão ainda aberta no navegador
  async function handleExit() {
    if (isAuthenticated) await logout()
    navigate('/')
  }

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
            {/* só o dono logado vê o atalho; a rota continua protegida pelo ProtectedRoute */}
            {isAuthenticated && (
              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  ./dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" className="px-2" onClick={handleExit}>
            [ sair ]
          </Button>
        </div>
      </div>
    </header>
  )
}
