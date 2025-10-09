import { motion } from 'framer-motion'
import ArrowRight from '../assets/icons/ArrowRight'

interface AppFeatureNavProps {
  activeIndex?: number
}

const items = ['Verstehen', 'Ausfüllen', 'Sortieren', 'Finden']

export default function AppFeatureNav({ activeIndex = 0 }: AppFeatureNavProps) {
  return (
    <div className="mx-auto flex h-screen max-w-7xl flex-col justify-center space-y-2 px-4 pb-40 text-4xl md:px-8 md:text-5xl">
      {items.map((label, index) => (
        <motion.div
          key={label}
          initial={{ x: 0, opacity: 0.3 }}
          animate={{ x: index === activeIndex ? 0 : 0, opacity: index === activeIndex ? 1 : 0.3 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`flex items-center gap-2 ${index === activeIndex ? 'font-bold' : 'font-light'}`}
        >
          {index === activeIndex && (
            <span className="">
              <ArrowRight className="stroke-2" />
            </span>
          )}
          {label}
        </motion.div>
      ))}
    </div>
  )
}
