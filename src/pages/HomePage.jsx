import { Link } from 'react-router'
import { Card } from '../components/ui/Card'
import { MENU_ITEMS } from '../data/navigation'
import { PROFILE } from '../data/profile'

export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <p className="text-sm text-muted">
        <span className="text-primary">[ OK ]</span> sessão iniciada como{' '}
        <span className="text-secondary">convidado</span>
      </p>
      <h1 className="mt-3 text-3xl font-bold text-primary sm:text-5xl dark:text-glow">
        ACESSO CONCEDIDO
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        Você está no terminal de {PROFILE.fullName}. {PROFILE.tagline}
      </p>

      <nav aria-label="Menu do portfólio" className="mt-10">
        <p className="text-sm text-muted">$ ls ./menu</p>
        <ul className="mt-3 grid gap-4 sm:grid-cols-3">
          {MENU_ITEMS.map((item) => (
            <li key={item.to}>
              <Card
                as={Link}
                to={item.to}
                title={`.${item.to}`}
                className="block h-full transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-none"
              >
                <h2 className="text-lg font-semibold text-primary">{item.label}</h2>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
                <p className="mt-4 text-sm text-secondary">[ abrir ] →</p>
              </Card>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
