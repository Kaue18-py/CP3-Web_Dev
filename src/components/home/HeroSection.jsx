import { PROFILE, SOCIAL_LINKS } from '../../data/profile'
import { ButtonLink } from '../ui/ButtonLink'
import { ScanTerminal } from './ScanTerminal'

const githubUrl = SOCIAL_LINKS.find((link) => link.label === 'GitHub').href
const linkedinUrl = SOCIAL_LINKS.find((link) => link.label === 'LinkedIn').href

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 pt-14 pb-12 sm:pt-20 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <p className="text-sm text-secondary">{PROFILE.role}</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-6xl">
          <span className="text-primary">&gt;</span> {PROFILE.name}
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">{PROFILE.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={githubUrl}>GitHub ↗</ButtonLink>
          <ButtonLink href={linkedinUrl} variant="secondary">
            LinkedIn ↗
          </ButtonLink>
        </div>
      </div>
      <ScanTerminal />
    </section>
  )
}
