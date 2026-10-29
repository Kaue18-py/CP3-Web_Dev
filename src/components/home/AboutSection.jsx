import { PROFILE } from '../../data/profile'
import { Card } from '../ui/Card'
import { Section } from '../ui/Section'

export function AboutSection() {
  return (
    <Section id="sobre" command="cat ~/.plan">
      <Card title="~/.plan">
        <div className="space-y-4 leading-relaxed">
          {PROFILE.plan.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          <span className="text-secondary"># estudando agora:</span> {PROFILE.studying.join(' · ')}
        </p>
      </Card>
    </Section>
  )
}
