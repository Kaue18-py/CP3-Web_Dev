import { Link, useLocation } from 'react-router'

export default function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <p className="text-muted">
        <span className="text-secondary">kaue@portfolio</span>:~$ cd {pathname}
      </p>
      <h1 className="text-danger mt-2 text-3xl font-bold sm:text-5xl">404</h1>
      <p className="mt-4">
        bash: cd: <span className="text-warning">{pathname}</span>: Arquivo ou diretório não
        encontrado
      </p>
      <Link to="/" className="text-secondary mt-8 inline-block underline underline-offset-4">
        cd ~ (voltar para a home)
      </Link>
    </section>
  )
}
