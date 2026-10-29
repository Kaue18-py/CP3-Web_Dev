import { PROFILE } from '../../data/profile'
import { Card } from '../ui/Card'
import { Section } from '../ui/Section'

export function AboutSection() {
  return (
    <Section id="sobre" command="whoami">
      <Card title="~/sobre.txt">
        <div className="space-y-4 leading-relaxed">
          {PROFILE.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Card>
    </Section>
  )
}
