// Título das páginas internas: mostra o "caminho" atual e o título como um comando
export function PageHeader({ path, title, children }) {
  return (
    <header className="mx-auto max-w-5xl px-4 pt-12">
      <p className="text-sm text-muted">
        <span className="text-secondary">kaue@fsociety</span>:{path}$
      </p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
        <span className="text-primary dark:text-glow">&gt;</span> {title}
      </h1>
      {children && <p className="mt-3 max-w-2xl text-muted">{children}</p>}
    </header>
  )
}
