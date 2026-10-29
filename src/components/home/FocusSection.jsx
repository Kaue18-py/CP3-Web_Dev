import { FOCUS_AREAS } from '../../data/profile'
import { toProgressBar } from '../../utils/toProgressBar'
import { Card } from '../ui/Card'
import { Section } from '../ui/Section'

export function FocusSection() {
  return (
    <Section id="foco" command="./focus --now">
      <ul className="grid gap-4 sm:grid-cols-2">
        {FOCUS_AREAS.map((area) => (
          <li key={area.name}>
            <Card as="div" title={`foco/${area.name.toLowerCase()}`} className="h-full">
              <h3 className="font-semibold">{area.name}</h3>
              <p className="mt-2 text-primary">
                <span aria-hidden="true">
                  {toProgressBar(area.level)} {area.level}/10
                </span>
                <span className="sr-only">Nível {area.level} de 10</span>
              </p>
              <p className="mt-2 text-sm text-muted">{area.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
