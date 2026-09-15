'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImage = any

interface SlideshowProps {
  images: SanityImage[]
  alt: string
  /** Auto-advance interval in ms. Set to 0 to disable autoplay. */
  interval?: number
}

export function Slideshow({ images, alt, interval = 5000 }: SlideshowProps) {
  const valid = (images || []).filter(Boolean)
  const count = valid.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (n: number) => setIndex(prev => (n + count) % count),
    [count],
  )

  useEffect(() => {
    if (paused || interval <= 0 || count <= 1) return
    const id = setInterval(() => setIndex(prev => (prev + 1) % count), interval)
    return () => clearInterval(id)
  }, [paused, interval, count])

  if (count === 0) return null

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative' }}
    >
      {/* Slides */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', background: '#0D1B2E', overflow: 'hidden' }}>
        {valid.map((img, i) => (
          <Image
            key={i}
            src={urlFor(img).width(1600).height(1000).url()}
            alt={count > 1 ? `${alt} — image ${i + 1} of ${count}` : alt}
            fill
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 760px"
            style={{
              objectFit: 'cover',
              opacity: i === index ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(index - 1)}
              style={arrowStyle('left')}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(index + 1)}
              style={arrowStyle('right')}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {count > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
          {valid.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? '1.75rem' : '0.5rem',
                height: '0.5rem',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                background: i === index ? '#C8921A' : 'rgba(13,27,46,0.2)',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    [side]: '0.75rem',
    transform: 'translateY(-50%)',
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    background: 'rgba(7,30,61,0.55)',
    color: '#ffffff',
    fontSize: '1.5rem',
    lineHeight: 1,
    fontFamily: "'Sora', sans-serif",
  }
}
