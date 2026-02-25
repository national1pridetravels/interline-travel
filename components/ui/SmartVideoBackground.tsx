'use client'

import { useEffect, useRef } from 'react'

type SmartVideoBackgroundProps = {
  src: string
  poster?: string
  preload?: 'none' | 'metadata' | 'auto'
  className?: string
  pauseWhenOffscreen?: boolean
}

export default function SmartVideoBackground({
  src,
  poster,
  preload = 'metadata',
  className = '',
  pauseWhenOffscreen = false,
}: SmartVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    }

    const handleReady = () => {
      tryPlay()
    }

    video.addEventListener('loadedmetadata', handleReady)
    video.addEventListener('canplay', handleReady)
    video.addEventListener('canplaythrough', handleReady)

    tryPlay()

    let observer: IntersectionObserver | undefined
    if (pauseWhenOffscreen) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (!entry) return

          if (entry.isIntersecting) {
            tryPlay()
          } else {
            video.pause()
          }
        },
        { threshold: 0.1, rootMargin: '120px 0px' }
      )

      observer.observe(video)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause()
      } else {
        tryPlay()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      video.removeEventListener('loadedmetadata', handleReady)
      video.removeEventListener('canplay', handleReady)
      video.removeEventListener('canplaythrough', handleReady)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [pauseWhenOffscreen])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload={preload}
      poster={poster}
      className={className}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
