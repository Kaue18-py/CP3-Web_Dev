import { AboutSection } from '../components/home/AboutSection'
import { ScanTerminal } from '../components/home/ScanTerminal'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'

export default function AboutPage() {
  return (
    <>
      <PageHeader path="~/sobre" title="sobre">
        Quem eu sou, o que estou estudando e as tecnologias que já uso em projetos.
      </PageHeader>
      <AboutSection />
      <Section id="habilidades" command="./scan --habilidades">
        <ScanTerminal />
      </Section>
    </>
  )
}
