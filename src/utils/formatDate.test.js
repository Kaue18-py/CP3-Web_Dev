import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formata a data no padrão brasileiro, no fuso de São Paulo', () => {
    expect(formatDate('2026-10-29T15:00:00Z')).toBe('29/10/2026')
    // 01:00 em UTC ainda é dia 29 em São Paulo (UTC-3)
    expect(formatDate('2026-10-30T01:00:00Z')).toBe('29/10/2026')
  })
})
