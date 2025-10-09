'use client'

import { useEffect } from 'react'

interface TallyEmbedProps {
  /** The full Tally embed URL (you can include query params here) */
  src: string
  /** Optional height in pixels */
  height?: number
  /** Optional iframe title */
  title?: string
}

const TallyEmbed = ({ src, height = 735, title = 'Tally Form' }: TallyEmbedProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const d = document
    const scriptSrc = 'https://tally.so/widgets/embed.js'

    const loadTally = () => {
      if ((window as any).Tally) {
        ;(window as any).Tally.loadEmbeds()
      } else {
        d.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((el) => {
          ;(el as HTMLIFrameElement).src = (el as HTMLIFrameElement).dataset.tallySrc || ''
        })
      }
    }

    // Load script only once globally
    if ((window as any).Tally) {
      loadTally()
    } else if (!d.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = d.createElement('script')
      s.src = scriptSrc
      s.async = true
      s.onload = loadTally
      s.onerror = loadTally
      d.body.appendChild(s)
    } else {
      loadTally()
    }
  }, [])

  return (
    <iframe
      data-tally-src={src}
      loading="lazy"
      width="100%"
      height={height}
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title={title}
    />
  )
}

export default TallyEmbed
