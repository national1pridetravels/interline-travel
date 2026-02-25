'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type SmartVideoBackgroundProps = {
  src: string
  poster?: string
  preload?: 'none' | 'metadata' | 'auto'
  className?: string
  pauseWhenOffscreen?: boolean
  disableOnMobile?: boolean
}

export default function SmartVideoBackground({
  src,
  poster,
  preload = 'metadata',
  className = '',
  pauseWhenOffscreen = false,
  disableOnMobile = true,
}: SmartVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canUseVideo, setCanUseVideo] = useState(false)

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 900px)')
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection

    const updatePreference = () => {
      const saveDataEnabled = Boolean(connection?.saveData)
      const shouldDisableVideo =
        reducedMotionQuery.matches || saveDataEnabled || (disableOnMobile && mobileQuery.matches)

      setCanUseVideo(!shouldDisableVideo)
    }

    const addQueryListener = (query: MediaQueryList) => {
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', updatePreference)
        return () => query.removeEventListener('change', updatePreference)
      }

      query.addListener(updatePreference)
      return () => query.removeListener(updatePreference)
    }

    updatePreference()
    const removeReducedMotionListener = addQueryListener(reducedMotionQuery)
    const removeMobileListener = addQueryListener(mobileQuery)

    return () => {
      removeReducedMotionListener()
      removeMobileListener()
    }
  }, [disableOnMobile])

  useEffect(() => {
    if (!canUseVideo) {
      const video = videoRef.current
      if (video) {
        video.pause()
      }
      return
    }

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
  }, [canUseVideo, pauseWhenOffscreen])

  if (!canUseVideo) {
    if (!poster) {
      return <div className={className} aria-hidden="true" />
    }

    return (
      <div className={`relative ${className}`} aria-hidden="true">
        <Image
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    )
  }

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
