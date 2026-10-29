import { PROFILE, SOCIAL_LINKS } from '../../data/profile'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Redes sociais">
          <p className="text-muted">$ ./contato --links</p>
          <ul className="mt-2 flex flex-wrap gap-4">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-muted">
          © {new Date().getFullYear()} {PROFILE.fullName}
        </p>
      </div>
    </footer>
  )
}
