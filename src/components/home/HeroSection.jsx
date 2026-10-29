import { PROFILE, TYPING_PHRASES } from '../../data/profile'
import { TypingText } from './TypingText'

export function HeroSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-20 pb-16 sm:pt-28">
      <p className="text-muted">
        <span className="text-secondary">{PROFILE.username}@portfolio</span>:~$ ./start.sh
      </p>
      <h1 className="mt-3 text-4xl font-bold sm:text-6xl">
        <span className="text-primary">&gt;</span> {PROFILE.name}
      </h1>
      {/* altura reservada para 2 linhas no celular: a frase muda de tamanho sem empurrar a página */}
      <TypingText
        phrases={TYPING_PHRASES}
        className="mt-4 min-h-14 text-lg text-muted sm:min-h-7"
      />
    </section>
  )
}
