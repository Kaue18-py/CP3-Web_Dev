import { act, renderHook } from '@testing-library/react'
import { useTypewriter } from './useTypewriter'

const PHRASES = ['oi', 'tchau']
const OPTIONS = { typeSpeed: 100, deleteSpeed: 50, pauseTime: 1000 }

function advance(ms) {
  act(() => vi.advanceTimersByTime(ms))
}

describe('useTypewriter', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('digita a frase uma letra por vez', () => {
    const { result } = renderHook(() => useTypewriter(PHRASES, OPTIONS))
    expect(result.current.text).toBe('')

    advance(100)
    expect(result.current.text).toBe('o')

    advance(100)
    expect(result.current.text).toBe('oi')
  })

  it('apaga a frase depois da pausa e começa a próxima', () => {
    const { result } = renderHook(() => useTypewriter(PHRASES, OPTIONS))

    // cada advance é um passo: o próximo timer só é agendado depois que o React atualiza
    advance(100) // digita "o"
    advance(100) // digita "i"
    advance(1000) // pausa com a frase completa
    advance(50) // apaga uma letra
    expect(result.current.text).toBe('o')

    advance(50) // apaga a última letra
    advance(50) // passa para a próxima frase
    advance(100) // digita a primeira letra
    expect(result.current.text).toBe('t')
  })

  it('com loop: false digita uma vez, para e avisa que terminou', () => {
    const { result } = renderHook(() => useTypewriter(['ok'], { ...OPTIONS, loop: false }))
    expect(result.current.isDone).toBe(false)

    advance(100) // digita "o"
    advance(100) // digita "k"
    expect(result.current).toEqual({ text: 'ok', isDone: true })

    advance(5000) // não apaga
    expect(result.current.text).toBe('ok')
  })

  it('mostra a primeira frase inteira, sem animação, para quem prefere menos movimento', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }))

    const { result } = renderHook(() => useTypewriter(PHRASES, OPTIONS))
    expect(result.current.text).toBe('oi')

    advance(5000)
    expect(result.current.text).toBe('oi')
  })
})
