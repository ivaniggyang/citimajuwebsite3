'use client'

import Link from 'next/link'

export function AboutCTA() {
  return (
    <section style={{ padding: '6rem 0', background: '#ffffff' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* Text */}
        <div>
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#1B4F8A',
              marginBottom: '0.75rem',
            }}
          >
            About CMG
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#0D1B2E',
              marginBottom: '1rem',
            }}
          >
            Trusted. Certified. Delivered.
          </h2>
          <div style={{ width: '3rem', height: '1.5px', background: '#C8921A', marginBottom: '1.5rem' }} />
          <p
            style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: '15px',
              lineHeight: 1.75,
              color: '#3A5068',
              marginBottom: '1rem',
            }}
          >
            Citi Maju Group is a CIDB Grade G7 certified contractor with a track record of large-scale infrastructure projects across Klang Valley.
          </p>
          <p
            style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: '15px',
              lineHeight: 1.75,
              color: '#3A5068',
              marginBottom: '2rem',
            }}
          >
            We deliver water reticulation, civil and structural works, and full renovation services — with the credentials and capacity to handle projects of any scale.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Link
              href="/about"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.06em',
                color: '#1B4F8A',
                textDecoration: 'none',
                borderBottom: '1px solid #C8921A',
                paddingBottom: '2px',
              }}
            >
              Learn More →
            </Link>
            <Link
              href="/contact"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.06em',
                color: '#ffffff',
                background: '#1B4F8A',
                padding: '0.625rem 1.5rem',
                textDecoration: 'none',
              }}
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Credentials panel */}
        <div
          style={{
            background: '#071E3D',
            padding: '3rem',
            position: 'relative',
          }}
        >
          {/* Gold accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '3rem',
              right: '3rem',
              height: '2px',
              background: '#C8921A',
            }}
          />
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C8921A',
              marginBottom: '2rem',
              marginTop: '0.5rem',
            }}
          >
            Credentials
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'CIDB Grade', value: 'G7', sub: "Malaysia's highest contractor grade" },
              { label: 'Air Selangor', value: 'Approved', sub: 'Water works contractor approval' },
              { label: 'Registration', value: 'Active', sub: 'SSM registered entities' },
              { label: 'Coverage', value: 'Klang Valley', sub: 'Primary operational area' },
            ].map(({ label, value, sub }) => (
              <div key={label} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 300,
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(232,241,251,0.5)',
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: '1.25rem',
                      color: '#ffffff',
                    }}
                  >
                    {value}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "'Noto Sans', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(232,241,251,0.45)',
                    textAlign: 'right',
                  }}
                >
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
