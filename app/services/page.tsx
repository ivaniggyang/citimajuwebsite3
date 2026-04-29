import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ALL_SERVICES_QUERY } from '@/sanity/lib/queries'
import { PageHero } from '@/components/ui/PageHero'
import { getServicesPage, s } from '@/sanity/lib/fetch'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Water reticulation, hot tapping, civil and structural works, renovation, and more — delivered by Citi Maju Group across Klang Valley.',
}

interface Service {
  _id: string
  title: string
  category: string
  shortDescription: string
}

const PLACEHOLDER_SERVICES: Service[] = [
  { _id: '1', title: 'Water Reticulation', category: 'water-utilities', shortDescription: 'Large-scale water main laying, service connections, and reticulation network works.' },
  { _id: '2', title: 'Hot Tapping', category: 'water-utilities', shortDescription: 'Live main connections without service interruption.' },
  { _id: '3', title: 'Pipeline Works', category: 'water-utilities', shortDescription: 'HDPE, DI, and uPVC pipelines including pipe bursting, sleeving, and trenchless methods.' },
  { _id: '4', title: 'Civil & Structural Works', category: 'civil-structural', shortDescription: 'Earthworks, drainage, reinforced concrete structures, and full civil scope.' },
  { _id: '5', title: 'Metal Structure Fabrication', category: 'civil-structural', shortDescription: 'Steel canopies, walkways, mezzanines, industrial frames, and other structural steelwork.' },
  { _id: '6', title: 'Renovation & Refurbishment', category: 'renovation-finishing', shortDescription: 'Partition walls, ceilings, tiling, plastering, painting, and M&E coordination.' },
  { _id: '7', title: 'Painting & Plastering', category: 'renovation-finishing', shortDescription: 'Internal and external finishes for commercial and residential buildings.' },
  { _id: '8', title: 'Leak Repair & Waterproofing', category: 'renovation-finishing', shortDescription: 'Diagnosis and remediation of structural leaks and pipe repair works.' },
]

const categoryGroups = [
  { id: 'water-utilities', label: 'Water & Utilities' },
  { id: 'civil-structural', label: 'Civil & Structural' },
  { id: 'renovation-finishing', label: 'Renovation & Finishing' },
  { id: 'engineering', label: 'Engineering' },
]

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getServicesPage(),
    client.fetch(ALL_SERVICES_QUERY, {}, { next: { revalidate: 0 } }).catch(() => []) as Promise<Service[]>,
  ])

  const displayServices = services.length > 0 ? services : PLACEHOLDER_SERVICES

  return (
    <>
      <PageHero
        eyebrow={s(page.heroEyebrow, 'What We Do')}
        heading={s(page.heroHeading, 'Our Services')}
        sub={s(page.heroSub, 'From water mains to structural steel — we cover the full scope of infrastructure and building works.')}
      />

      <section style={{ padding: '7rem 0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          {categoryGroups.map(({ id, label }) => {
            const group = displayServices.filter(srv => srv.category === id)
            if (group.length === 0) return null
            return (
              <div key={id} style={{ marginBottom: '5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ width: '3px', height: '2rem', background: '#C8921A', flexShrink: 0 }} />
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#0D1B2E', lineHeight: 1.15 }}>
                    {label}
                  </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5px', background: 'rgba(13,27,46,0.08)' }}>
                  {group.map(srv => (
                    <div key={srv._id} style={{ background: '#ffffff', padding: '2.75rem' }}>
                      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '17px', letterSpacing: '0.01em', color: '#0D1B2E', marginBottom: '0.875rem', lineHeight: 1.3 }}>
                        {srv.title}
                      </h3>
                      <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '14px', lineHeight: 1.75, color: '#3A5068' }}>
                        {srv.shortDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section style={{ padding: '6rem 0', background: '#071E3D', textAlign: 'center' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#ffffff', marginBottom: '1rem', lineHeight: 1.15 }}>
            {s(page.ctaHeading, 'Ready to discuss your project?')}
          </h2>
          <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.75, color: 'rgba(232,241,251,0.7)', marginBottom: '2rem' }}>
            {s(page.ctaText, 'If you have a project in mind, we are happy to discuss scope and feasibility.')}
          </p>
          <Link href={s(page.ctaButtonHref, '/contact')} style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', color: '#071E3D', background: '#C8921A', padding: '0.875rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}>
            {s(page.ctaButtonLabel, 'Get In Touch')}
          </Link>
        </div>
      </section>
    </>
  )
}
