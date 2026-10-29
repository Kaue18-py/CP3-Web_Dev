import { useNavigate } from 'react-router'
import { ThemeToggle } from '../components/layout/ThemeToggle'
import { BootLog } from '../components/login/BootLog'
import { Greeting } from '../components/login/Greeting'
import { OwnerLoginForm } from '../components/login/OwnerLoginForm'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>

      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-lg">
          <Greeting />

          <Card as="section" title="fsociety@kaue: ~/login" className="mt-6">
            <BootLog />

            <Button className="mt-6 w-full" onClick={() => navigate('/inicio')}>
              &gt; acessar como convidado
            </Button>

            <details className="mt-6 border-t border-line pt-4">
              <summary className="cursor-pointer text-sm text-muted hover:text-foreground">
                acesso restrito (dono do site)
              </summary>
              <OwnerLoginForm />
            </details>
          </Card>
        </div>
      </main>
    </div>
  )
}
