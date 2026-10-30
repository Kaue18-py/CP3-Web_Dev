const formatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'America/Sao_Paulo',
})

// formatDate('2026-10-29T15:00:00Z') -> "29/10/2026"
export function formatDate(isoDate) {
  return formatter.format(new Date(isoDate))
}
