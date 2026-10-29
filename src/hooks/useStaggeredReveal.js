import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../utils/prefersReducedMotion'

// Devolve quantos itens já devem aparecer: 0, 1, 2... até total, um a cada `interval` ms
export function useStaggeredReveal(total, { interval = 150, start = true } = {}) {
  const [reducedMotion] = useState(prefersReducedMotion)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reducedMotion || !start || count >= total) return

    const timeout = setTimeout(() => setCount((current) => current + 1), interval)
    return () => clearTimeout(timeout)
  }, [count, total, interval, start, reducedMotion])

  return reducedMotion ? total : count
}
