'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

type ReviewMediaSlideshowProps = {
  images: string[]
}

export default function ReviewMediaSlideshow({ images }: ReviewMediaSlideshowProps) {
  const media = useMemo(() => images.filter(Boolean), [images])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (media.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % media.length)
    }, 4200)

    return () => clearInterval(interval)
  }, [media.length])

  useEffect(() => {
    if (activeIndex >= media.length) setActiveIndex(0)
  }, [activeIndex, media.length])

  if (!media.length) return null

  const currentImage = media[activeIndex]
  const isSingle = media.length === 1

  const goPrevious = () => {
    setActiveIndex((previous) => (previous - 1 + media.length) % media.length)
  }

  const goNext = () => {
    setActiveIndex((previous) => (previous + 1) % media.length)
  }

  return (
    <div className="rounded-3xl border border-[#cfbe95]/22 bg-[linear-gradient(165deg,rgba(18,22,31,0.9),rgba(12,16,22,0.94))] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.44)] backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold uppercase tracking-[0.06em] text-[#f3ecde]">Google Review Gallery</h3>
        <p className="text-sm text-[#bdb6a7]">Real images from live Google posts & reviews</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#cfbe95]/20 bg-slate-950">
        <div className="aspect-[16/10]">
          <Image
            src={currentImage}
            alt={`Google review media ${activeIndex + 1}`}
            fill
            sizes="(max-width: 1280px) 100vw, 820px"
            priority={activeIndex === 0}
            className="h-full w-full object-cover"
          />
        </div>

        {!isSingle && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={goPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-slate-900/65 p-2 text-white transition hover:bg-slate-900/85"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-slate-900/65 p-2 text-white transition hover:bg-slate-900/85"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {!isSingle && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {media.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              aria-label={`Show image ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-7 rounded-full transition ${
                index === activeIndex ? 'bg-[#c4a05e]' : 'bg-[#52555c] hover:bg-[#6a6e74]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
