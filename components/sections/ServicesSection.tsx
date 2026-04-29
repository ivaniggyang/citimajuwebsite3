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

const categoryColors: Record<string, string> = {
  'water-utilities': '#1B4F8A',
  'civil-structural': '#0D3362',
  'renovation-finishing': '#3A5068',
  'engineering': '#071E3D',
}

export function ServicesSection({ eyebrow, heading, viewAllLabel, services }: ServicesSectionProps) {
  const displayServices = services.length > 0 ? services : PLACEHOLDER_SERVICES

  return (
    <section style={{ padding: '7rem 0', background: '#F7F4EF' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '4rem', maxWidth: '720px' }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B4F8A', marginBottom: '0.875rem' }}>
            {eyebrow}
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', color: '#0D1B2E', marginBottom: '1.25rem', lineHeight: 1.1 }}>
            {heading}
          </h2>
          <div style={{ width: '3rem', height: '1.5px', background: '#C8921A' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5px', background: 'rgba(13,27,46,0.08)' }}>
          {displayServices.map((service) => (
            <div
              key={service._id}
              style={{ background: '#ffffff', padding: '2.75rem', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F5F2EC')}
              onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
            >
              <div style={{ width: '2px', height: '2rem', background: categoryColors[service.category] || '#1B4F8A', marginBottom: '1.5rem' }} />
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '17px', letterSpacing: '0.01em', color: '#0D1B2E', marginBottom: '0.875rem', lineHeight: 1.3 }}>
                {service.title}
              </h3>
              <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '14px', lineHeight: 1.7, color: '#3A5068' }}>
                {service.shortDescription}
              </p>
            </div>
          ))}
        </div>

        {viewAllLabel && (
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link href="/services" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', color: '#1B4F8A', textDecoration: 'none', borderBottom: '1px solid #C8921A', paddingBottom: '2px' }}>
              {viewAllLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

const PLACEHOLDER_SERVICES: Service[] = [
  { _id: '1', title: 'Water Reticulation', category: 'water-utilities', shortDescription: 'Large-scale water main laying, service connections, and reticulation network works for municipal and developer projects across Klang Valley.' },
  { _id: '2', title: 'Hot Tapping', category: 'water-utilities', shortDescription: 'Live main connections without service interruption. We carry out hot tapping on pressurised pipelines for Air Selangor and other utilities.' },
  { _id: '3', title: 'Civil & Structural Works', category: 'civil-structural', shortDescription: 'From earthworks and drainage to structural steel erection and reinforced concrete frames. We handle the full civil and structural scope.' },
  { _id: '4', title: 'Metal Structure Fabrication', category: 'civil-structural', shortDescription: 'Design and erection of steel structures including canopies, walkways, mezzanines, and industrial frameworks to specification.' },
  { _id: '5', title: 'Renovation & Refurbishment', category: 'renovation-finishing', shortDescription: 'End-to-end renovation works including wall patching, plastering, painting, tiling, and full interior fit-outs for commercial and residential properties.' },
  { _id: '6', title: 'Leak Repair & Waterproofing', category: 'renovation-finishing', shortDescription: 'Diagnosis and remediation of structural leaks, roof waterproofing, and pipe repair works. Minimal disruption, permanent fixes.' },
]
