import { useEffect, useState } from 'react'

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

// Calcula o próximo passo: digita, pausa com a frase completa, apaga e passa para a próxima frase
function nextStep({ index, length, deleting }, phrases) {
  const phrase = phrases[index]
  if (!deleting && length < phrase.length) return { index, length: length + 1, deleting }
  if (!deleting) return { index, length, deleting: true }
  if (length > 0) return { index, length: length - 1, deleting }
  return { index: (index + 1) % phrases.length, length: 0, deleting: false }
}

export function useTypewriter(
  phrases,
  { typeSpeed = 70, deleteSpeed = 35, pauseTime = 1800 } = {},
) {
  const [reducedMotion] = useState(prefersReducedMotion)
  const [step, setStep] = useState({ index: 0, length: 0, deleting: false })

  useEffect(() => {
    if (reducedMotion) return

    const phrase = phrases[step.index]
    const isFullPhrase = !step.deleting && step.length === phrase.length
    const delay = isFullPhrase ? pauseTime : step.deleting ? deleteSpeed : typeSpeed

    const timeout = setTimeout(() => setStep(nextStep(step, phrases)), delay)
    return () => clearTimeout(timeout)
  }, [step, phrases, reducedMotion, typeSpeed, deleteSpeed, pauseTime])

  // Quem prefere menos animação vê a primeira frase inteira, sem digitação
  if (reducedMotion) return phrases[0]
  return phrases[step.index].slice(0, step.length)
}
