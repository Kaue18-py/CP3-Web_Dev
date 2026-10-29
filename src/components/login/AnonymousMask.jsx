import maskUrl from '../../assets/anonymous-mask.webp'

// Máscara do Anonymous girando 360° com CSS. A imagem foi tratada antes de entrar no projeto:
// fundo preto removido, recortada e convertida para WebP em 2x o tamanho exibido (320x463, 16 kB).
// Decorativa: alt vazio e aria-hidden, leitores de tela ignoram.
export function AnonymousMask({ className = '' }) {
  return (
    <div aria-hidden="true" className={`flex justify-center perspective-[800px] ${className}`}>
      <img
        src={maskUrl}
        alt=""
        width="160"
        height="232"
        loading="lazy"
        decoding="async"
        draggable="false"
        className="animate-spin-y select-none motion-reduce:animate-none dark:drop-shadow-[0_0_10px_var(--primary)]"
      />
    </div>
  )
}
