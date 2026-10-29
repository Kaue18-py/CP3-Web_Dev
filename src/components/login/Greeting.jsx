import { useTypewriter } from '../../hooks/useTypewriter'

const GREETING = 'hello, friend.'

export function Greeting() {
  const { text, isDone } = useTypewriter([GREETING], { loop: false, typeSpeed: 90 })

  return (
    <h1 className="text-3xl font-bold text-primary sm:text-5xl dark:text-glow">
      <span className="sr-only">{GREETING}</span>
      <span aria-hidden="true">
        {text}
        <span
          className={`text-secondary motion-reduce:animate-none ${isDone ? 'animate-blink' : ''}`}
        >
          █
        </span>
      </span>
    </h1>
  )
}
