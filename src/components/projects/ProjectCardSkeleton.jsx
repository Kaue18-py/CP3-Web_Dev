import { Card } from '../ui/Card'
import { Skeleton } from '../ui/Skeleton'

// Mesmo formato e altura do ProjectCard: quando os dados chegam, a página não pula
export function ProjectCardSkeleton() {
  return (
    <Card as="div" title="carregando...">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="mt-3 min-h-[3lh] space-y-2 text-sm">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="mt-4 h-4 w-2/3" />
      <Skeleton className="mt-4 h-5 w-1/3" />
    </Card>
  )
}
