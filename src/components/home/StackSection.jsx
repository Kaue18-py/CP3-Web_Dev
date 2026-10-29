import { STACK } from '../../data/profile'
import { Card } from '../ui/Card'
import { Section } from '../ui/Section'

export function StackSection() {
  return (
    <Section id="stack" command="cat ./stack.txt">
      <div className="grid gap-4 sm:grid-cols-2">
        {STACK.map((group) => (
          <Card key={group.category} as="div" title={`stack/${group.category.toLowerCase()}`}>
            <h3 className="font-semibold">{group.category}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-sm border border-line px-2 py-1 text-sm text-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}
