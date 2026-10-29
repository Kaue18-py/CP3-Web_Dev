import { lazy, Suspense, useState } from 'react'
import { useNavigate } from 'react-router'
import { ThemeToggle } from '../components/layout/ThemeToggle'
import { BootLog } from '../components/login/BootLog'
import { Greeting } from '../components/login/Greeting'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

// O formulário do dono traz React Hook Form + Zod; quase nenhum visitante abre,
// então ele só é baixado quando alguém clica em "acesso restrito"
const OwnerLoginForm = lazy(() =>
  import('../components/login/OwnerLoginForm').then((module) => ({
    default: module.OwnerLoginForm,
  })),
)

export default function LoginPage() {
  const navigate = useNavigate()
  const [isOwnerAreaOpen, setIsOwnerAreaOpen] = useState(false)

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

            <details
              className="mt-6 border-t border-line pt-4"
              onToggle={(event) => setIsOwnerAreaOpen(event.currentTarget.open)}
            >
              <summary className="cursor-pointer text-sm text-muted hover:text-foreground">
                acesso restrito (dono do site)
              </summary>
              {isOwnerAreaOpen && (
                <Suspense fallback={<p className="mt-4 text-sm text-muted">carregando...</p>}>
                  <OwnerLoginForm />
                </Suspense>
              )}
            </details>
          </Card>
        </div>
      </main>
    </div>
  )
}
