import { Link } from 'react-router'
import { formatDate } from '../../utils/formatDate'
import { Card } from '../ui/Card'
import { StatusBadge } from './StatusBadge'

export function ProjectCard({ project }) {
  return (
    <Card
      as={Link}
      to={`/projetos/${project.slug}`}
      title={`~/projetos/${project.slug}`}
      className="block h-full transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-none"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-lg font-semibold break-all text-primary">{project.name}</h2>
        <StatusBadge inDevelopment={project.inDevelopment} />
      </div>

      {/* 3 linhas reservadas: cards com descrições de tamanhos diferentes ficam alinhados */}
      <p className="mt-3 line-clamp-3 min-h-[3lh] text-sm text-muted">
        {project.description ?? 'sem descrição'}
      </p>

      <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <div>
          <dt className="sr-only">Linguagem</dt>
          <dd>
            <span aria-hidden="true" className="text-secondary">
              ●
            </span>{' '}
            {project.language ?? 'não informada'}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Última atualização</dt>
          <dd>atualizado em {formatDate(project.updatedAt)}</dd>
        </div>
      </dl>

      <p className="mt-4 text-sm text-secondary">[ abrir relatório ] →</p>
    </Card>
  )
}
