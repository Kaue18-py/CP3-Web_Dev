import { PROFILE, SCAN } from '../../data/profile'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { useTypewriter } from '../../hooks/useTypewriter'
import { Card } from '../ui/Card'

const HEADER_LINES = [
  'Starting Nmap 7.95 ( https://nmap.org )',
  `Nmap scan report for ${SCAN.target}`,
  'Host is up (0.0042s latency).',
]
const TABLE_HEADER_LINE = HEADER_LINES.length
const FIRST_PORT_LINE = TABLE_HEADER_LINE + 1
const DONE_LINE = FIRST_PORT_LINE + SCAN.ports.length
const TOTAL_LINES = DONE_LINE + 1

const GRID = 'grid grid-cols-[5.5rem_4.5rem_1fr] gap-x-2 sm:grid-cols-[5.5rem_4.5rem_5rem_1fr]'

function Cursor() {
  return <span className="animate-blink text-primary motion-reduce:animate-none">█</span>
}

export function ScanTerminal() {
  const { text, isDone } = useTypewriter([SCAN.command], { loop: false, typeSpeed: 55 })
  const visibleLines = useStaggeredReveal(TOTAL_LINES, { interval: 140, start: isDone })

  // As linhas ainda não reveladas ficam invisíveis, mas ocupam espaço: a página não pula
  const reveal = (line) => (line < visibleLines ? '' : 'invisible')

  return (
    <Card as="div" title={`${PROFILE.username}@portfolio: ~`} className="text-xs sm:text-sm">
      <div aria-hidden="true">
        <p>
          <span className="text-secondary">$</span> {text}
          {!isDone && <Cursor />}
        </p>

        <div className="mt-3 space-y-1">
          {HEADER_LINES.map((line, index) => (
            <p key={line} className={`text-muted ${reveal(index)}`}>
              {line}
            </p>
          ))}

          <p className={`${GRID} pt-2 font-semibold ${reveal(TABLE_HEADER_LINE)}`}>
            <span>PORT</span>
            <span>STATE</span>
            <span>SERVICE</span>
            <span className="hidden sm:block">VERSION</span>
          </p>

          {SCAN.ports.map((item, index) => (
            <p key={item.port} className={`${GRID} ${reveal(FIRST_PORT_LINE + index)}`}>
              <span>{item.port}</span>
              <span className={item.state === 'open' ? 'text-secondary' : 'text-warning'}>
                {item.state}
              </span>
              <span>{item.service}</span>
              <span className="col-span-3 pl-4 text-muted sm:col-span-1 sm:pl-0">
                {item.version}
              </span>
            </p>
          ))}

          <p className={`pt-2 text-muted ${reveal(DONE_LINE)}`}>
            Nmap done: 1 IP address (1 host up) scanned {visibleLines === TOTAL_LINES && <Cursor />}
          </p>
        </div>
      </div>

      {/* Versão para leitores de tela, sem a animação */}
      <div className="sr-only">
        <p>Resultado da varredura em {SCAN.target}:</p>
        <ul>
          {SCAN.ports.map((item) => (
            <li key={item.port}>
              {item.version} ({item.state === 'open' ? 'uso em projetos' : 'em estudo'})
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 border-t border-line pt-3 text-muted">
        <span className="text-secondary">open</span> = uso em projetos ·{' '}
        <span className="text-warning">filtered</span> = em estudo
      </p>
    </Card>
  )
}
