// Campo de formulário com label e mensagem de erro. multiline troca o input por um textarea.
// No React 19 o `ref` chega como prop comum, então o register() do React Hook Form funciona direto.
export function Input({ id, label, error, multiline = false, className = '', ...props }) {
  const Field = multiline ? 'textarea' : 'input'
  const errorId = `${id}-erro`

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm text-muted">
        <span className="text-primary">$</span> {label}
      </label>
      <Field
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="mt-1 w-full rounded-sm border border-line bg-background px-3 py-2 text-foreground outline-none placeholder:text-muted focus:border-primary aria-invalid:border-danger"
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-danger">
          [ !! ] {error}
        </p>
      )}
    </div>
  )
}
