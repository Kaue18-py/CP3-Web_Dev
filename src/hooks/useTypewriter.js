import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../utils/prefersReducedMotion'

// Calcula o próximo passo: digita, pausa com a frase completa, apaga e passa para a próxima frase
function nextStep({ index, length, deleting }, phrases) {
  const phrase = phrases[index]
  if (!deleting && length < phrase.length) return { index, length: length + 1, deleting }
  if (!deleting) return { index, length, deleting: true }
  if (length > 0) return { index, length: length - 1, deleting }
  return { index: (index + 1) % phrases.length, length: 0, deleting: false }
}

// loop: true repete as frases para sempre; false digita até a última frase e para
export function useTypewriter(
  phrases,
  { typeSpeed = 70, deleteSpeed = 35, pauseTime = 1800, loop = true } = {},
) {
  const [reducedMotion] = useState(prefersReducedMotion)
  const [step, setStep] = useState({ index: 0, length: 0, deleting: false })

  const phrase = phrases[step.index]
  const isFullPhrase = !step.deleting && step.length === phrase.length
  const isFinished = !loop && isFullPhrase && step.index === phrases.length - 1

  useEffect(() => {
    if (reducedMotion || isFinished) return

    const delay = isFullPhrase ? pauseTime : step.deleting ? deleteSpeed : typeSpeed
    const timeout = setTimeout(() => setStep(nextStep(step, phrases)), delay)
    return () => clearTimeout(timeout)
  }, [step, phrases, reducedMotion, isFinished, isFullPhrase, typeSpeed, deleteSpeed, pauseTime])

  // Quem prefere menos animação vê a frase inteira, sem digitação
  if (reducedMotion) return { text: phrases[loop ? 0 : phrases.length - 1], isDone: true }
  return { text: phrase.slice(0, step.length), isDone: isFinished }
}
