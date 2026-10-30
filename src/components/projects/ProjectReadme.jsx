import { useProjectReadme } from '../../hooks/useProjectReadme'
import { Card } from '../ui/Card'
import { Skeleton } from '../ui/Skeleton'

const SKELETON_LINES = ['w-1/2', 'w-full', 'w-11/12', 'w-4/5', 'w-1/3', 'w-full', 'w-3/4']

export function ProjectReadme({ project }) {
  const { data: html, isPending, isError } = useProjectReadme(project.name)

  let content
  if (isPending) {
    content = (
      <div className="space-y-3">
        <p className="sr-only" role="status">
          carregando README
        </p>
        {SKELETON_LINES.map((width, index) => (
          <Skeleton key={index} className={`h-4 ${width}`} />
        ))}
      </div>
    )
  } else if (isError) {
    content = (
      <p role="alert" className="text-danger">
        [ !! ] não foi possível carregar o README agora.{' '}
        <a href={project.url} className="text-secondary underline underline-offset-4">
          Veja direto no GitHub
        </a>
        .
      </p>
    )
  } else if (!html) {
    content = <p className="text-warning">[ -- ] este repositório ainda não tem README.</p>
  } else {
    // O HTML vem da API do GitHub, que já renderiza e limpa o markdown (remove scripts e eventos)
    content = <div className="readme" dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <Card as="section" title="README.md" aria-label="README do projeto">
      {content}
    </Card>
  )
}
