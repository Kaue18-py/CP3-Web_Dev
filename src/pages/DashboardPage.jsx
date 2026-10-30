import { useNavigate } from 'react-router'
import { DashboardFeatured } from '../components/dashboard/DashboardFeatured'
import { DashboardMessages } from '../components/dashboard/DashboardMessages'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'
import { useAuth } from '../hooks/useAuth'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <>
      <PageHeader path="~/dashboard" title="dashboard">
        Área restrita. Logado como <span className="text-secondary">{user?.email}</span>.
      </PageHeader>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-12">
        <div className="flex justify-end">
          <Button variant="ghost" onClick={handleLogout}>
            [ sair da conta ]
          </Button>
        </div>

        <section aria-labelledby="titulo-mensagens">
          <h2 id="titulo-mensagens" className="mb-4 text-lg font-semibold text-primary">
            mensagens recebidas
          </h2>
          <DashboardMessages />
        </section>

        <section aria-labelledby="titulo-destaques">
          <h2 id="titulo-destaques" className="mb-1 text-lg font-semibold text-primary">
            projetos em destaque
          </h2>
          <p className="mb-4 text-sm text-muted">
            Os projetos marcados aparecem na página inicial do portfólio.
          </p>
          <DashboardFeatured />
        </section>
      </div>
    </>
  )
}
