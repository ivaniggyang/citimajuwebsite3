import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { ALL_SERVICES_QUERY } from '@/sanity/lib/queries'
import { PageHero } from '@/components/ui/PageHero'
import { urlFor } from '@/sanity/lib/image'
import { getServicesPage, s } from '@/sanity/lib/fetch'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Water reticulation, hot tapping, civil and structural works, renovation, and more — delivered by Citi Maju Group across Klang Valley.',
}

interface Category {
  id?: string
  title?: string
  value?: string
  order?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImage = any

interface Service {
  _id: string
  title: string
  category?: Category
  shortDescription: string
  slug?: { current: string }
  hasDetail?: boolean
  coverImage?: SanityImage
}

interface ServiceGroup {
  key: string
  label: string
  order: number
  items: Service[]
}

// Build category groups from the categories the services actually
// reference. The label list is managed in the Studio ("Category / Label"),
// so groups appear and disappear automatically as labels are added/removed.
function groupByCategory(services: Service[]): ServiceGroup[] {
  const groups = new Map<string, ServiceGroup>()
  for (const srv of services) {
    const key = srv.category?.value || 'uncategorized'
    const label = srv.category?.title || 'Other'
    const order = srv.category?.order ?? 999
    if (!groups.has(key)) groups.set(key, { key, label, order, items: [] })
    groups.get(key)!.items.push(srv)
  }
  return [...groups.values()].sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
}

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getServicesPage(),
    client.fetch(ALL_SERVICES_QUERY, {}, { next: { revalidate: 0 } }).catch(() => []) as Promise<Service[]>,
  ])

  const displayServices = services
  const groups = groupByCategory(displayServices)

  return (
    <>
      <PageHero
        eyebrow={s(page.heroEyebrow, 'What We Do')}
        heading={s(page.heroHeading, 'Our Services')}
        sub={s(page.heroSub, 'From water mains to structural steel — we cover the full scope of infrastructure and building works.')}
      />

      <section style={{ padding: '9rem 0', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          {displayServices.length === 0 ? (
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', color: '#6B849C' }}>No services listed yet.</p>
          ) : (
            groups.map(({ key, label, items }) => (
              <div key={key} style={{ marginBottom: '5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ width: '3px', height: '2rem', background: '#C8921A', flexShrink: 0 }} />
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#0D1B2E', lineHeight: 1.15 }}>
                    {label}
                  </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {items.map(srv => (
                    <div key={srv._id} style={{ background: '#F7F4EF', display: 'flex', flexDirection: 'column' }}>
                      {srv.coverImage && (
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden' }}>
                          <Image
                            src={urlFor(srv.coverImage).width(640).height(400).url()}
                            alt={srv.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      )}
                      <div style={{ padding: '2.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '17px', letterSpacing: '0.01em', color: '#0D1B2E', marginBottom: '0.875rem', lineHeight: 1.3 }}>
                          {srv.title}
                        </h3>
                        <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '14px', lineHeight: 1.75, color: '#3A5068' }}>
                          {srv.shortDescription}
                        </p>
                        {srv.slug?.current && (
                          <Link
                            href={`/services/${srv.slug.current}`}
                            style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '12px', letterSpacing: '0.06em', color: '#1B4F8A', textDecoration: 'none', borderBottom: '1px solid #C8921A', paddingBottom: '2px', marginTop: '1.5rem', alignSelf: 'flex-start' }}
                          >
                            Learn More →
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section style={{ padding: '8rem 0', background: '#071E3D', textAlign: 'center' }}>
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
