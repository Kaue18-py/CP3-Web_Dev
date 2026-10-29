// true quando o visitante configurou o sistema para reduzir animações
export function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}
