import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string
  client?: string
  location?: string
  completionYear?: number
  coverImage?: { asset: { _ref: string } }
  description?: string
}

interface FeaturedProjectsProps {
  eyebrow: string
  heading: string
  viewAllLabel: string
  projects: Project[]
}

const categoryLabels: Record<string, string> = {
  'water-reticulation': 'Water Reticulation',
  'civil-structural': 'Civil & Structural',
  'renovation': 'Renovation',
  'hot-tapping': 'Hot Tapping',
  'engineering': 'Engineering',
}

export function FeaturedProjects({ eyebrow, heading, viewAllLabel, projects }: FeaturedProjectsProps) {
  const displayProjects = projects.length > 0 ? projects : PLACEHOLDER_PROJECTS

  return (
    <section style={{ padding: '7rem 0', background: '#071E3D' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '4rem' }}>
          <div>
            <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8921A', marginBottom: '0.875rem' }}>
              {eyebrow}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', color: '#ffffff', lineHeight: 1.1 }}>
              {heading}
            </h2>
          </div>
          {viewAllLabel && (
            <Link href="/projects" style={{ fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: '13px', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(200,146,26,0.5)', paddingBottom: '2px', whiteSpace: 'nowrap' }}>
              {viewAllLabel}
            </Link>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5px' }}>
          {displayProjects.slice(0, 6).map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug?.current || '#'}`} style={{ display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', background: index % 3 === 0 ? '#0D3362' : index % 3 === 1 ? '#1B4F8A' : '#0D1B2E', overflow: 'hidden' }}>
        {project.coverImage ? (
          <Image src={urlFor(project.coverImage).width(720).height(540).url()} alt={project.title} fill style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }} sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.15 }}>
            <svg viewBox="0 0 97 111" height="60" width="52" aria-hidden="true">
              <text x="48.5" y="74" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="60" fontWeight="600" fill="#ffffff">CM</text>
              <line x1="18.5" y1="97" x2="78.5" y2="97" stroke="#C8921A" strokeWidth="1.5" />
            </svg>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,30,61,0.9) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem' }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C8921A', marginBottom: '0.5rem' }}>
            {categoryLabels[project.category] || project.category}{project.completionYear ? ` · ${project.completionYear}` : ''}
          </p>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '16px', color: '#ffffff', lineHeight: 1.35 }}>
            {project.title}
          </h3>
          {project.location && (
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '12px', color: 'rgba(232,241,251,0.6)', marginTop: '0.35rem' }}>
              {project.location}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

const PLACEHOLDER_PROJECTS: Project[] = [
  { _id: '1', title: 'Sg. Buloh Water Reticulation — Phase 3', slug: { current: '#' }, category: 'water-reticulation', location: 'Shah Alam, Selangor', completionYear: 2024 },
  { _id: '2', title: 'Live Main Connection, Puchong Industrial', slug: { current: '#' }, category: 'hot-tapping', location: 'Puchong, Selangor', completionYear: 2024 },
  { _id: '3', title: 'Structural Steel Canopy, Klang Valley Distribution Hub', slug: { current: '#' }, category: 'civil-structural', location: 'Klang, Selangor', completionYear: 2023 },
  { _id: '4', title: 'Full Renovation, Damansara Office Tower', slug: { current: '#' }, category: 'renovation', location: 'Damansara, KL', completionYear: 2023 },
  { _id: '5', title: 'Waterproofing & Facade Repair, Shah Alam Complex', slug: { current: '#' }, category: 'renovation', location: 'Shah Alam, Selangor', completionYear: 2023 },
  { _id: '6', title: 'Reticulation Network Extension — Ara Damansara', slug: { current: '#' }, category: 'water-reticulation', location: 'Ara Damansara, Selangor', completionYear: 2022 },
]
