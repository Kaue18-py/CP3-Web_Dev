export function Section({ id, command, children }) {
  const titleId = `${id}-titulo`

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="mx-auto max-w-4xl scroll-mt-20 px-4 py-12"
    >
      <h2 id={titleId} className="text-xl font-bold sm:text-2xl">
        <span className="text-primary">&gt;</span> {command}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}
