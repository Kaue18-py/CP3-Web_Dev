import { toProgressBar } from './toProgressBar'

describe('toProgressBar', () => {
  it('preenche a barra de acordo com o nível', () => {
    expect(toProgressBar(6)).toBe('██████░░░░')
    expect(toProgressBar(0)).toBe('░░░░░░░░░░')
    expect(toProgressBar(10)).toBe('██████████')
  })

  it('aceita outro tamanho de barra', () => {
    expect(toProgressBar(2, 5)).toBe('██░░░')
  })

  it('limita valores fora do intervalo', () => {
    expect(toProgressBar(-3)).toBe('░░░░░░░░░░')
    expect(toProgressBar(15)).toBe('██████████')
  })
})
