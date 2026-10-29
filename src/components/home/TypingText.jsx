import { useTypewriter } from '../../hooks/useTypewriter'

export function TypingText({ phrases, className = '' }) {
  const { text } = useTypewriter(phrases)

  return (
    <p className={className}>
      {/* Leitores de tela recebem as frases completas, sem a digitação letra por letra */}
      <span className="sr-only">{phrases.join('. ')}</span>
      <span aria-hidden="true">
        {text}
        <span className="animate-blink text-primary motion-reduce:animate-none">█</span>
      </span>
    </p>
  )
}
