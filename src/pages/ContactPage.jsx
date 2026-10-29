import { ContactForm } from '../components/contact/ContactForm'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { SOCIAL_LINKS } from '../data/profile'

export default function ContactPage() {
  return (
    <>
      <PageHeader path="~/contato" title="contato">
        Abra um canal seguro: a mensagem chega direto no meu e-mail.
      </PageHeader>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12 lg:grid-cols-[1fr_18rem]">
        <Card title="./contato.sh">
          <ContactForm />
        </Card>

        <Card as="aside" title="outros canais">
          <ul className="space-y-3">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary underline-offset-4 hover:underline"
                >
                  &gt; {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
