import { Link } from 'react-router'
import { useFeaturedSlugs } from '../../hooks/useFeatured'
import { useProjects } from '../../hooks/useProjects'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectCardSkeleton } from '../projects/ProjectCardSkeleton'

// Projetos escolhidos como destaque no dashboard. Os dados vêm do mesmo cache da página de projetos.
export function FeaturedProjects() {
  const projects = useProjects()
  const featured = useFeaturedSlugs()

  let content
  if (projects.isPending || featured.isPending) {
    content = (
      <>
        <p className="sr-only" role="status">
          carregando destaques
        </p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <li key={i}>
              <ProjectCardSkeleton />
            </li>
          ))}
        </ul>
      </>
    )
  } else if (projects.isError || featured.isError) {
    content = (
      <p role="alert" className="text-sm text-danger">
        [ !! ] não foi possível carregar os destaques agora.
      </p>
    )
  } else {
    const featuredSlugs = new Set(featured.data)
    const highlighted = projects.data.filter((project) => featuredSlugs.has(project.slug))

    content =
      highlighted.length === 0 ? (
        <p className="text-sm text-muted">[ -- ] nenhum destaque selecionado por enquanto.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {highlighted.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )
  }

  return (
    <section aria-labelledby="titulo-destaques" className="mt-14">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="titulo-destaques" className="text-xl font-bold">
          <span className="text-primary">&gt;</span> cat ./destaques
        </h2>
        <Link to="/projetos" className="text-sm text-secondary underline-offset-4 hover:underline">
          ver todos os projetos →
        </Link>
      </div>
      <div className="mt-6">{content}</div>
    </section>
  )
}
