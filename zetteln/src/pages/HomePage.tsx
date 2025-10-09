import About from '../components/About'
import AppFeature from '../components/AppFeature'
import Intro from '../components/Intro'
import Partner from '../components/Partner'
import { sections } from '../Section'

export default function HomePage() {
  return (
    <>
      <section className="w-full">
        <Intro />
      </section>
      <section id="features">
        <AppFeature sections={sections} />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="support">
        <Partner />
      </section>
    </>
  )
}
