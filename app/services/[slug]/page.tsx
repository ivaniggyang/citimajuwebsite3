import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { SERVICE_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { Slideshow } from '@/components/ui/Slideshow'

export const revalidate = 60

interface PortableSpan {
  _key?: string
  text?: string
  marks?: string[]
}

interface PortableBlock {
  _key?: string
  _type?: string
  style?: string
  listItem?: string
  children?: PortableSpan[]
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
  slug: { current: string }
  category?: Category
  shortDescription?: string
  fullDescription?: PortableBlock[]
  coverImage?: SanityImage
  gallery?: SanityImage[]
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service: Service | null = await client
    .fetch(SERVICE_BY_SLUG_QUERY, { slug })
    .catch(() => null)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: service.title,
    description: service.shortDescription,
  }
}

// Minimal, dependency-free Portable Text renderer.
// Handles the block types a Sanity "block" array produces: headings,
// blockquotes, bullet/numbered list items, and normal paragraphs,
// plus basic strong/emphasis marks. No external library required.
function renderSpans(children?: PortableSpan[]) {
  return (children || []).map((span, i) => {
    const marks = span.marks || []
    const style: CSSProperties = {}
    if (marks.includes('strong')) style.fontWeight = 700
    if (marks.includes('em')) style.fontStyle = 'italic'
    return (
      <span key={span._key || i} style={style}>
        {span.text || ''}
      </span>
    )
  })
}

function RichText({ blocks }: { blocks?: PortableBlock[] }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, i) => {
        const key = block._key || i
        const spans = renderSpans(block.children)

        if (block.listItem) {
          return (
            <div
              key={key}
              style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}
            >
              <span style={{ color: '#C8921A', flexShrink: 0, lineHeight: 1.8 }}>
                {block.listItem === 'number' ? '›' : '•'}
              </span>
              <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.8, color: '#3A5068', margin: 0 }}>
                {spans}
              </p>
            </div>
          )
        }

        if (block.style && /^h[1-4]$/.test(block.style)) {
          return (
            <h2
              key={key}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)', color: '#0D1B2E', lineHeight: 1.2, marginTop: '2.5rem', marginBottom: '1rem' }}
            >
              {spans}
            </h2>
          )
        }

        if (block.style === 'blockquote') {
          return (
            <blockquote
              key={key}
              style={{ borderLeft: '2px solid #C8921A', paddingLeft: '1.25rem', margin: '1.5rem 0', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.35rem', lineHeight: 1.4, color: '#0D1B2E' }}
            >
              {spans}
            </blockquote>
          )
        }

        return (
          <p
            key={key}
            style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.85, color: '#3A5068', marginBottom: '1.25rem' }}
          >
            {spans}
          </p>
        )
      })}
    </>
  )
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service: Service | null = await client
    .fetch(SERVICE_BY_SLUG_QUERY, { slug })
    .catch(() => null)
  if (!service) notFound()

  const hasFull = Array.isArray(service.fullDescription) && service.fullDescription.length > 0
  const slides = [service.coverImage, ...(service.gallery || [])].filter(Boolean)

  return (
    <>
      {/* Hero band */}
      <div style={{ background: '#071E3D', padding: '4rem 0 3.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <Link
            href="/services"
            style={{ fontFamily: "'Sora', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', letterSpacing: '0.04em', marginBottom: '1.25rem', display: 'inline-block' }}
          >
            ← All Services
          </Link>
          {service.category?.title && (
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8921A', marginBottom: '0.65rem' }}>
              {service.category.title}
            </p>
          )}
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#ffffff', lineHeight: 1.1 }}>
            {service.title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <section style={{ padding: '4rem 0 6rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 2rem' }}>
          {service.shortDescription && (
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '18px', lineHeight: 1.7, color: '#0D1B2E', fontWeight: 500, marginBottom: '2.5rem' }}>
              {service.shortDescription}
            </p>
          )}

          <div style={{ width: '3rem', height: '1.5px', background: '#C8921A', marginBottom: '2rem' }} />

          {hasFull ? (
            <RichText blocks={service.fullDescription} />
          ) : (
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.8, color: '#6B849C' }}>
              More detail about this service is coming soon.
            </p>
          )}

          {slides.length > 0 && (
            <div style={{ marginTop: '3.5rem' }}>
              <Slideshow images={slides} alt={service.title} />
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 0', background: '#F7F4EF', textAlign: 'center' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#0D1B2E', marginBottom: '1rem', lineHeight: 1.15 }}>
            Interested in this service?
          </h2>
          <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.75, color: '#3A5068', marginBottom: '2rem' }}>
            Get in touch to discuss scope, feasibility, and how we can help on your project.
          </p>
          <Link
            href="/contact"
            style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', color: '#071E3D', background: '#C8921A', padding: '0.875rem 2.5rem', textDecoration: 'none', display: 'inline-block' }}
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  )
}
