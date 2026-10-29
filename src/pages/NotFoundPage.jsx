import { Link, useLocation } from 'react-router'

export default function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <p className="text-muted">
        <span className="text-secondary">kaue@fsociety</span>:~$ cd {pathname}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-danger sm:text-5xl">404</h1>
      <p className="mt-4">
        bash: cd: <span className="text-warning">{pathname}</span>: Arquivo ou diretório não
        encontrado
      </p>
      <Link to="/inicio" className="mt-8 inline-block text-secondary underline underline-offset-4">
        cd ~ (voltar para o início)
      </Link>
    </section>
  )
}
