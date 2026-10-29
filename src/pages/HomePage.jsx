import { AboutSection } from '../components/home/AboutSection'
import { FocusSection } from '../components/home/FocusSection'
import { HeroSection } from '../components/home/HeroSection'
import { StackSection } from '../components/home/StackSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FocusSection />
      <StackSection />
    </>
  )
}
