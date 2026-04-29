'use client'

import Link from 'next/link'

interface Credential { label?: string; value?: string; sub?: string }

interface AboutCTAProps {
  eyebrow: string
  heading: string
  body: string[]
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  credentialsEyebrow: string
  credentials: Credential[]
}

export function AboutCTA({ eyebrow, heading, body, primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref, credentialsEyebrow, credentials }: AboutCTAProps) {
  const validCredentials = credentials.filter(c => c && (c.label || c.value || c.sub))

  return (
    <section style={{ padding: '7rem 0', background: '#ffffff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div>
          {eyebrow && (
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B4F8A', marginBottom: '0.875rem' }}>
              {eyebrow}
            </p>
          )}
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', color: '#0D1B2E', marginBottom: '1.25rem', lineHeight: 1.1 }}>
            {heading}
          </h2>
          <div style={{ width: '3rem', height: '1.5px', background: '#C8921A', marginBottom: '2rem' }} />
          {body.map((para, i) => (
            <p key={i} style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '16px', lineHeight: 1.8, color: '#3A5068', marginBottom: '1.25rem' }}>
              {para}
            </p>
          ))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
            {primaryCtaLabel && (
              <Link href={primaryCtaHref || '/about'} style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', color: '#1B4F8A', textDecoration: 'none', borderBottom: '1px solid #C8921A', paddingBottom: '2px' }}>
                {primaryCtaLabel}
              </Link>
            )}
            {secondaryCtaLabel && (
              <Link href={secondaryCtaHref || '/contact'} style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', color: '#ffffff', background: '#1B4F8A', padding: '0.625rem 1.5rem', textDecoration: 'none' }}>
                {secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>

        <div style={{ background: '#071E3D', padding: '3rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: '3rem', right: '3rem', height: '2px', background: '#C8921A' }} />
          {credentialsEyebrow && (
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8921A', marginBottom: '2rem', marginTop: '0.5rem' }}>
              {credentialsEyebrow}
            </p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {validCredentials.map((c, i) => (
              <div key={i} style={{ borderBottom: i < validCredentials.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none', paddingBottom: i < validCredentials.length - 1 ? '1.25rem' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,241,251,0.5)' }}>
                    {c.label}
                  </p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '1.25rem', color: '#ffffff' }}>
                    {c.value}
                  </p>
                </div>
                {c.sub && (
                  <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '12px', color: 'rgba(232,241,251,0.45)', textAlign: 'right' }}>
                    {c.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
