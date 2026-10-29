import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'

// Os projetos vêm da API do GitHub na próxima etapa (requisito 3)
export default function ProjectsPage() {
  return (
    <>
      <PageHeader path="~/projetos" title="projetos">
        Alvos encontrados no meu GitHub.
      </PageHeader>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Card title="scan: github.com/Kaue18-py">
          <p>
            <span className="text-warning">[ .. ]</span> módulo de projetos em desenvolvimento
          </p>
          <p className="mt-2 text-sm text-muted">
            Em breve os projetos aparecem aqui, carregados direto da API do GitHub.
          </p>
        </Card>
      </div>
    </>
  )
}
