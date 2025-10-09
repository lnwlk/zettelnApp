import { useEffect, useState } from 'react'
import AppFeatureNav from './AppFeatureNav'

interface Section {
  id: string
  label: string
  Component: React.FC<{ id: string }>
}

interface AppFeatureProps {
  sections: Section[]
}

export default function AppFeature({ sections }: AppFeatureProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const sectionEls = sections.map((s) => document.getElementById(s.id))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionEls.findIndex((sec) => sec === entry.target)
            setActiveIndex(index)
          }
        })
      },
      { threshold: 0.01 },
    )
    sectionEls.forEach((sec) => sec && observer.observe(sec))
    return () => sectionEls.forEach((sec) => sec && observer.unobserve(sec))
  }, [sections])

  return (
    <div>
      {sections.map((section) => (
        <div key={section.id} className="relative">
          {/* Sticky nav behind content */}
          <div className="px-auto sticky top-0 z-0 h-screen">
            <AppFeatureNav activeIndex={activeIndex} />
          </div>

          {/* Section content */}
          <div className="relative z-10 min-h-[70vh]">
            <section id={section.id} className="relative z-10">
              <section.Component id={section.id} />
            </section>
          </div>
        </div>
      ))}
    </div>
  )
}
