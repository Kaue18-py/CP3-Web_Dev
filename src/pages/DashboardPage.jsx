import { useNavigate } from 'react-router'
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

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-primary">mensagens recebidas</h2>
          <Button variant="ghost" onClick={handleLogout}>
            [ sair da conta ]
          </Button>
        </div>
        <DashboardMessages />
      </div>
    </>
  )
}
