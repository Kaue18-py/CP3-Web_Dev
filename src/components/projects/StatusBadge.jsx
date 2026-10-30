// Selo de status do projeto, vindo da etiqueta "em-desenvolvimento" no GitHub
export function StatusBadge({ inDevelopment }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-sm border px-2 py-0.5 text-xs font-semibold ${
        inDevelopment ? 'border-warning text-warning' : 'border-primary text-primary'
      }`}
    >
      [ {inDevelopment ? 'EM DESENVOLVIMENTO' : 'CONCLUÍDO'} ]
    </span>
  )
}
