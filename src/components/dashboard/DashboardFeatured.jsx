import { useFeaturedSlugs, useToggleFeatured } from '../../hooks/useFeatured'
import { useProjects } from '../../hooks/useProjects'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { EmptyState } from '../ui/EmptyState'
import { ErrorState } from '../ui/ErrorState'
import { Skeleton } from '../ui/Skeleton'

export function DashboardFeatured() {
  const projects = useProjects()
  const featured = useFeaturedSlugs()
  const toggle = useToggleFeatured()

  if (projects.isPending || featured.isPending) {
    return (
      <div className="space-y-3">
        <p className="sr-only" role="status">
          carregando projetos
        </p>
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    )
  }

  if (projects.isError || featured.isError) {
    return (
      <ErrorState
        source={projects.isError ? 'api.github.com' : 'supabase'}
        title="falha ao carregar os projetos"
        description="Verifique sua conexão e tente de novo."
        onRetry={() => {
          projects.refetch()
          featured.refetch()
        }}
      />
    )
  }

  if (projects.data.length === 0) {
    return <EmptyState title="nenhum projeto com a etiqueta portfolio no GitHub" />
  }

  const featuredSlugs = new Set(featured.data)

  return (
    <Card title="destaques da página inicial">
      <ul className="divide-y divide-line">
        {projects.data.map((project) => {
          const isFeatured = featuredSlugs.has(project.slug)
          const isUpdating = toggle.isPending && toggle.variables?.slug === project.slug
          return (
            <li key={project.slug} className="flex items-center justify-between gap-3 py-3">
              <span className={isFeatured ? 'text-primary' : 'text-foreground'}>
                {project.name}
              </span>
              <Button
                variant={isFeatured ? 'primary' : 'ghost'}
                isLoading={isUpdating}
                aria-pressed={isFeatured}
                aria-label={`${isFeatured ? 'Remover' : 'Colocar'} ${project.name} em destaque`}
                onClick={() => toggle.mutate({ slug: project.slug, featured: !isFeatured })}
                className="text-xs"
              >
                {isFeatured ? '[ ★ em destaque ]' : '[ ☆ destacar ]'}
              </Button>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
