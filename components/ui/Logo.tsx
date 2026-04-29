'use client'

import Link from 'next/link'

interface LogoProps {
  variant?: 'blue' | 'white' | 'navy'
  showWordmark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 32, md: 48, lg: 64 }

export function Logo({ variant = 'blue', showWordmark = true, size = 'md' }: LogoProps) {
  const markHeight = sizes[size]
  const letterColor = variant === 'white' ? '#FFFFFF' : variant === 'navy' ? '#071E3D' : '#1B4F8A'
  const wordmarkColor = variant === 'white' ? '#FFFFFF' : '#0D1B2E'

  return (
    <Link href="/" className="flex items-center gap-3 no-underline" aria-label="Citi Maju Group — Home">
      {/* CM Mark */}
      <svg
        viewBox="0 0 97 111"
        height={markHeight}
        width={markHeight * (97 / 111)}
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <text
          x="48.5"
          y="74"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Garamond, serif"
          fontSize="60"
          fontWeight="600"
          letterSpacing="-1"
          fill={letterColor}
        >
          CM
        </text>
        <line x1="18.5" y1="97" x2="78.5" y2="97" stroke="#C8921A" strokeWidth="1.5" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <div style={{ lineHeight: 1 }}>
          <div
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 300,
              fontSize: size === 'sm' ? '11px' : size === 'lg' ? '16px' : '13px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: wordmarkColor,
            }}
          >
            Citi Maju
          </div>
          <div
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 300,
              fontSize: size === 'sm' ? '8px' : size === 'lg' ? '11px' : '9px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: variant === 'white' ? 'rgba(255,255,255,0.65)' : '#6B849C',
              marginTop: '3px',
            }}
          >
            Group
          </div>
        </div>
      )}
    </Link>
  )
}
