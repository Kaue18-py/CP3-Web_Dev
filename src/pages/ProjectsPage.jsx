import { ProjectsList } from '../components/projects/ProjectsList'
import { PageHeader } from '../components/ui/PageHeader'

export default function ProjectsPage() {
  return (
    <>
      <PageHeader path="~/projetos" title="projetos">
        Alvos encontrados no meu GitHub, carregados direto da API. Os marcados como em
        desenvolvimento ainda não estão 100% completos.
      </PageHeader>
      <div className="mx-auto max-w-5xl px-4 py-12">
        <ProjectsList />
      </div>
    </>
  )
}
