import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { PROJECT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug }).catch(() => null)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.description,
  }
}

const categoryLabels: Record<string, string> = {
  'water-reticulation': 'Water Reticulation',
  'civil-structural': 'Civil & Structural',
  'renovation': 'Renovation',
  'hot-tapping': 'Hot Tapping',
  'engineering': 'Engineering',
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug }).catch(() => null)
  if (!project) notFound()

  return (
    <>
      {/* Hero image */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '400px', background: '#071E3D' }}>
        {project.coverImage && (
          <Image
            src={urlFor(project.coverImage).width(1400).height(800).url()}
            alt={project.title}
            fill
            style={{ objectFit: 'cover', opacity: 0.6 }}
            priority
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #071E3D 0%, rgba(7,30,61,0.4) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '3rem', left: 0, right: 0, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <Link href="/projects" style={{ fontFamily: "'Sora', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', letterSpacing: '0.04em', marginBottom: '1rem', display: 'inline-block' }}>
            ← All Projects
          </Link>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8921A', marginBottom: '0.5rem' }}>
            {categoryLabels[project.category] || project.category}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#ffffff', lineHeight: 1.1 }}>
            {project.title}
          </h1>
        </div>
      </div>

      {/* Details */}
      <section style={{ padding: '4rem 0 6rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <div>
            {project.description && (
              <>
                <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B4F8A', marginBottom: '0.75rem' }}>
                  Project Overview
                </p>
                <div style={{ width: '3rem', height: '1.5px', background: '#C8921A', marginBottom: '1.5rem' }} />
                <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', lineHeight: 1.8, color: '#3A5068' }}>
                  {project.description}
                </p>
              </>
            )}
          </div>

          {/* Metadata panel */}
          <div style={{ background: '#F5F2EC', padding: '2.5rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: '2.5rem', right: '2.5rem', height: '2px', background: '#C8921A' }} />
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B4F8A', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
              Project Details
            </p>
            <dl style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { term: 'Category', value: categoryLabels[project.category] },
                project.client && { term: 'Client', value: project.client },
                project.location && { term: 'Location', value: project.location },
                project.completionYear && { term: 'Completed', value: String(project.completionYear) },
                project.contractValue && { term: 'Contract Value', value: project.contractValue },
                project.entity && { term: 'Entity', value: project.entity === 'engineering' ? 'Citi Maju Engineering Sdn Bhd' : 'Citi Maju Construction Sdn Bhd' },
              ].filter(Boolean).map((item: { term: string; value: string } | false) => {
                if (!item) return null
                return (
                  <div key={item.term} style={{ borderBottom: '1px solid rgba(13,27,46,0.08)', paddingBottom: '1rem' }}>
                    <dt style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B849C', marginBottom: '0.25rem' }}>{item.term}</dt>
                    <dd style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '14px', color: '#0D1B2E', fontWeight: 500 }}>{item.value}</dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 2rem' }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1B4F8A', marginBottom: '1.5rem' }}>
              Photo Gallery
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '4px' }}>
              {project.gallery.map((img: { asset: { _ref: string } }, idx: number) => (
                <div key={idx} style={{ position: 'relative', aspectRatio: '4/3', background: '#E8F1FB' }}>
                  <Image
                    src={urlFor(img).width(640).height(480).url()}
                    alt={`${project.title} — photo ${idx + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <div style={{ padding: '3rem 2rem', background: '#F7F4EF', textAlign: 'center' }}>
        <Link href="/projects" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', color: '#1B4F8A', textDecoration: 'none', borderBottom: '1px solid #C8921A', paddingBottom: '2px' }}>
          ← Back to All Projects
        </Link>
      </div>
    </>
  )
}
