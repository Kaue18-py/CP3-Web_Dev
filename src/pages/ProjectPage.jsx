import { Link, useParams } from 'react-router'
import { ProjectDetails } from '../components/projects/ProjectDetails'
import { ProjectReadme } from '../components/projects/ProjectReadme'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorState } from '../components/ui/ErrorState'
import { Skeleton } from '../components/ui/Skeleton'
import { useProject } from '../hooks/useProject'
import { describeGithubError } from '../services/githubService'

export default function ProjectPage() {
  const { slug } = useParams()
  const { data: project, isPending, isError, error, refetch } = useProject(slug)

  let content
  if (isPending) {
    content = (
      <div className="space-y-4">
        <p className="sr-only" role="status">
          carregando projeto
        </p>
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-full max-w-3xl" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    )
  } else if (isError) {
    content = (
      <ErrorState
        source="api.github.com"
        title="falha ao carregar o projeto do GitHub"
        description={describeGithubError(error)}
        onRetry={() => refetch()}
      />
    )
  } else if (!project) {
    content = (
      <EmptyState title={`projeto "${slug}" não encontrado`}>
        Ele pode ter sido renomeado ou não faz mais parte do portfólio.
      </EmptyState>
    )
  } else {
    content = (
      <div className="space-y-10">
        <ProjectDetails project={project} />
        <ProjectReadme project={project} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-12">
      <Link to="/projetos" className="text-sm text-secondary underline-offset-4 hover:underline">
        ← cd ../projetos
      </Link>
      {content}
    </div>
  )
}
