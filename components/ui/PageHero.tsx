interface PageHeroProps {
  eyebrow: string
  heading: string
  sub?: string
}

export function PageHero({ eyebrow, heading, sub }: PageHeroProps) {
  return (
    <section
      style={{
        background: '#071E3D',
        padding: '10rem 0 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(27,79,138,0.25) 0%, transparent 70%)',
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
          background: 'linear-gradient(to bottom, transparent, #C8921A 40%, #C8921A 60%, transparent)',
          opacity: 0.6,
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C8921A',
            marginBottom: '1rem',
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: sub ? '1rem' : 0,
          }}
        >
          {heading}
        </h1>
        {sub && (
          <p
            style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: '16px',
              lineHeight: 1.75,
              color: 'rgba(232,241,251,0.75)',
              maxWidth: '560px',
              marginTop: '1.25rem',
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </section>
  )
}
