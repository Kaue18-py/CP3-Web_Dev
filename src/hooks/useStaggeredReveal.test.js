import { act, renderHook } from '@testing-library/react'
import { useStaggeredReveal } from './useStaggeredReveal'

function advance(ms) {
  act(() => vi.advanceTimersByTime(ms))
}

describe('useStaggeredReveal', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('revela um item por vez até o total', () => {
    const { result } = renderHook(() => useStaggeredReveal(3, { interval: 100 }))
    expect(result.current).toBe(0)

    advance(100)
    expect(result.current).toBe(1)
    advance(100)
    advance(100)
    expect(result.current).toBe(3)

    advance(1000)
    expect(result.current).toBe(3)
  })

  it('espera o start ficar true para começar', () => {
    const { result, rerender } = renderHook(
      ({ start }) => useStaggeredReveal(3, { interval: 100, start }),
      { initialProps: { start: false } },
    )

    advance(500)
    expect(result.current).toBe(0)

    rerender({ start: true })
    advance(100)
    expect(result.current).toBe(1)
  })

  it('mostra tudo de uma vez para quem prefere menos movimento', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }))

    const { result } = renderHook(() => useStaggeredReveal(5, { start: false }))

    expect(result.current).toBe(5)
  })
})
