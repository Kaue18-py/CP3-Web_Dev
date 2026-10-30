import { useProjects } from '../../hooks/useProjects'
import { describeGithubError } from '../../services/githubService'
import { EmptyState } from '../ui/EmptyState'
import { ErrorState } from '../ui/ErrorState'
import { ProjectCard } from './ProjectCard'
import { ProjectCardSkeleton } from './ProjectCardSkeleton'

// Lista de projetos com os quatro estados: carregando (skeleton), erro, vazio e com dados
const SKELETON_COUNT = 4

export function ProjectsList() {
  const { data: projects, isPending, isError, error, refetch } = useProjects()

  if (isPending) {
    return (
      <>
        <p className="sr-only" role="status">
          carregando projetos
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <li key={index}>
              <ProjectCardSkeleton />
            </li>
          ))}
        </ul>
      </>
    )
  }

  if (isError) {
    return (
      <ErrorState
        source="api.github.com"
        title="falha ao carregar os projetos do GitHub"
        description={describeGithubError(error)}
        onRetry={() => refetch()}
      />
    )
  }

  if (projects.length === 0) {
    return (
      <EmptyState title="nenhum projeto encontrado">
        Nenhum repositório com a etiqueta &quot;portfolio&quot; no GitHub por enquanto.
      </EmptyState>
    )
  }

  return (
    <>
      <p className="mb-4 text-sm text-muted">
        <span className="text-primary">[ OK ]</span> {projects.length} alvos encontrados
      </p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  )
}
