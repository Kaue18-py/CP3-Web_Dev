import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'

const BOOT_LINES = [
  { status: 'OK', text: 'iniciando kaue.dev' },
  { status: 'OK', text: 'carregando módulos: react, tailwind, supabase' },
  { status: 'OK', text: 'conexão segura estabelecida' },
  { status: '!!', text: 'acesso restrito: identifique-se' },
]

export function BootLog() {
  const visibleLines = useStaggeredReveal(BOOT_LINES.length, { interval: 350 })

  return (
    // Decorativo: as linhas ocupam espaço desde o início (invisible) para a tela não pular
    <ul aria-hidden="true" className="space-y-1 text-xs sm:text-sm">
      {BOOT_LINES.map((line, index) => (
        <li key={line.text} className={index < visibleLines ? '' : 'invisible'}>
          <span className={line.status === 'OK' ? 'text-primary' : 'text-secondary'}>
            [ {line.status} ]
          </span>{' '}
          <span className="text-muted">{line.text}</span>
        </li>
      ))}
    </ul>
  )
}
