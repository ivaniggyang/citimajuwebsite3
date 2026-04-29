'use client'

import Link from 'next/link'

interface Stat { value?: string; label?: string }

interface HeroSectionProps {
  eyebrow: string
  heading: string
  subtext: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  stats: Stat[]
}

export function HeroSection({ eyebrow, heading, subtext, primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref, stats }: HeroSectionProps) {
  const validStats = stats.filter(s => s && (s.value || s.label))

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#071E3D',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 70% 50%, rgba(27,79,138,0.35) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(13,51,98,0.4) 0%, transparent 60%)
          `,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          background: 'linear-gradient(to bottom, transparent, #C8921A 30%, #C8921A 70%, transparent)',
          opacity: 0.7,
        }}
      />

      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '9rem 2rem 6rem', width: '100%' }}>
        {eyebrow && (
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8921A', marginBottom: '1.5rem' }}>
            {eyebrow}
          </p>
        )}

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Garamond, serif",
            fontWeight: 400,
            fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)',
            lineHeight: 1.05,
            color: '#FFFFFF',
            maxWidth: '900px',
            marginBottom: '2rem',
            letterSpacing: '-0.01em',
          }}
        >
          {heading}
        </h1>

        <div style={{ width: '3rem', height: '1.5px', background: '#C8921A', marginBottom: '2rem' }} />

        <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '17px', lineHeight: 1.75, color: 'rgba(232,241,251,0.85)', maxWidth: '640px', marginBottom: '3rem' }}>
          {subtext}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {primaryCtaLabel && (
            <Link
              href={primaryCtaHref || '/projects'}
              style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', color: '#071E3D', background: '#C8921A', padding: '0.875rem 2rem', textDecoration: 'none', transition: 'background 0.2s', display: 'inline-block' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#DBA830')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C8921A')}
            >
              {primaryCtaLabel}
            </Link>
          )}
          {secondaryCtaLabel && (
            <Link
              href={secondaryCtaHref || '/contact'}
              style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: '13px', letterSpacing: '0.06em', color: '#ffffff', border: '1px solid rgba(255,255,255,0.35)', padding: '0.875rem 2rem', textDecoration: 'none', transition: 'border-color 0.2s', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffffff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
            >
              {secondaryCtaLabel}
            </Link>
          )}
        </div>

        {validStats.length > 0 && (
          <div style={{ marginTop: '5rem', display: 'flex', flexWrap: 'wrap', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
            {validStats.map((stat, i) => (
              <div key={i}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#ffffff', lineHeight: 1, marginBottom: '0.4rem' }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,241,251,0.55)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
