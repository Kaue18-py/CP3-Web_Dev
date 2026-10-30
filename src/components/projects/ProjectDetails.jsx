import { formatDate } from '../../utils/formatDate'
import { ButtonLink } from '../ui/ButtonLink'
import { StatusBadge } from './StatusBadge'

export function ProjectDetails({ project }) {
  return (
    <header>
      <p className="text-sm text-muted">
        <span className="text-secondary">kaue@fsociety</span>:~/projetos/{project.slug}$ cat
        relatorio.md
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold break-all sm:text-4xl">
          <span className="text-primary dark:text-glow">&gt;</span> {project.name}
        </h1>
        <StatusBadge inDevelopment={project.inDevelopment} />
      </div>

      {project.description && (
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">{project.description}</p>
      )}

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
        <div className="flex gap-2">
          <dt>linguagem:</dt>
          <dd className="text-foreground">{project.language ?? 'não informada'}</dd>
        </div>
        <div className="flex gap-2">
          <dt>atualizado em:</dt>
          <dd className="text-foreground">{formatDate(project.updatedAt)}</dd>
        </div>
      </dl>

      {project.inDevelopment && (
        <p className="mt-4 text-sm text-warning">
          [ !! ] Projeto em desenvolvimento: ainda não está 100% completo.
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={project.url}>ver código no GitHub ↗</ButtonLink>
        {project.homepage && (
          <ButtonLink href={project.homepage} variant="secondary">
            abrir site ↗
          </ButtonLink>
        )}
      </div>
    </header>
  )
}
