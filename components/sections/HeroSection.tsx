'use client'

import Link from 'next/link'

interface HeroSectionProps {
  heading: string
  subtext: string
}

export function HeroSection({ heading, subtext }: HeroSectionProps) {
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
      {/* Background texture */}
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
      {/* Gold hairline accent */}
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

      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '8rem 2rem 6rem',
          width: '100%',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C8921A',
            marginBottom: '1.5rem',
          }}
        >
          Citi Maju Group
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Garamond, serif",
            fontWeight: 400,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.1,
            color: '#FFFFFF',
            maxWidth: '720px',
            marginBottom: '2rem',
          }}
        >
          {heading}
        </h1>

        {/* Gold rule */}
        <div
          style={{
            width: '3rem',
            height: '1.5px',
            background: '#C8921A',
            marginBottom: '2rem',
          }}
        />

        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Noto Sans', sans-serif",
            fontSize: '16px',
            lineHeight: 1.75,
            color: 'rgba(232,241,251,0.85)',
            maxWidth: '560px',
            marginBottom: '3rem',
          }}
        >
          {subtext}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Link
            href="/projects"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: '#071E3D',
              background: '#C8921A',
              padding: '0.875rem 2rem',
              textDecoration: 'none',
              transition: 'background 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#DBA830')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C8921A')}
          >
            View Our Projects
          </Link>
          <Link
            href="/contact"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.35)',
              padding: '0.875rem 2rem',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
            }}
          >
            Contact Us
          </Link>
        </div>

        {/* Credentials strip */}
        <div
          style={{
            marginTop: '5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2.5rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '2rem',
          }}
        >
          {[
            { value: 'G7', label: 'CIDB Grade' },
            { value: 'Approved', label: 'Air Selangor' },
            { value: '10+', label: 'Years in Operation' },
            { value: '100+', label: 'Projects Completed' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: '#ffffff',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 300,
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(232,241,251,0.55)',
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
