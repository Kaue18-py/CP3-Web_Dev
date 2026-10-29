// Transforma um nível em barra de texto estilo terminal: toProgressBar(6) -> "██████░░░░"
export function toProgressBar(level, total = 10) {
  const filled = Math.min(Math.max(Math.round(level), 0), total)
  return '█'.repeat(filled) + '░'.repeat(total - filled)
}
