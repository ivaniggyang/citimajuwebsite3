'use client'

import Link from 'next/link'

interface Service {
  _id: string
  title: string
  category: string
  shortDescription: string
}

interface ServicesSectionProps {
  eyebrow: string
  heading: string
  viewAllLabel: string
  services: Service[]
}

const categoryAccents: Record<string, string> = {
  'water-utilities': '#1B4F8A',
  'civil-structural': '#0D3362',
  'renovation-finishing': '#3A5068',
  'engineering': '#071E3D',
}

export function ServicesSection({ eyebrow, heading, viewAllLabel, services }: ServicesSectionProps) {
  if (services.length === 0) return null
  const displayServices = services

  return (
    <section style={{ padding: '9rem 0', background: '#F7F4EF' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '5rem', maxWidth: '720px' }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B4F8A', marginBottom: '0.875rem' }}>
            {eyebrow}
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', color: '#0D1B2E', marginBottom: '1.25rem', lineHeight: 1.05 }}>
            {heading}
          </h2>
          <div style={{ width: '3rem', height: '1.5px', background: '#C8921A' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {displayServices.map((service) => (
            <div
              key={service._id}
              style={{ background: '#ffffff', padding: '2.75rem', transition: 'background 0.2s', borderBottom: `2px solid ${categoryAccents[service.category] || '#1B4F8A'}` }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F0EDE7')}
              onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
            >
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '17px', letterSpacing: '0.01em', color: '#0D1B2E', marginBottom: '1rem', lineHeight: 1.3 }}>
                {service.title}
              </h3>
              <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '14px', lineHeight: 1.75, color: '#3A5068' }}>
                {service.shortDescription}
              </p>
            </div>
          ))}
        </div>

        {viewAllLabel && (
          <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <Link href="/services" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', color: '#1B4F8A', textDecoration: 'none', borderBottom: '1px solid #C8921A', paddingBottom: '2px' }}>
              {viewAllLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
