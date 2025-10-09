import { useEffect, useRef } from 'react'

type VideoPlayerProps = {
  src: string
  title?: string
  controls?: boolean
  loop?: boolean
}

export default function VideoPlayer({ src, title, controls = false, loop = true }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true

    const handlePlay = () => {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true
          video.play().catch(() => {})
        })
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handlePlay()
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <video
      ref={videoRef}
      className="h-full w-auto object-contain"
      autoPlay
      muted
      playsInline
      loop={loop}
      controls={controls}
      title={title}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
