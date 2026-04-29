'use client'

import { useState } from 'react'
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
  contractValue?: string
  coverImage?: { asset: { _ref: string } }
  description?: string
}

const categoryLabels: Record<string, string> = {
  'water-reticulation': 'Water Reticulation',
  'civil-structural': 'Civil & Structural',
  'renovation': 'Renovation',
  'hot-tapping': 'Hot Tapping',
  'engineering': 'Engineering',
}

const filters = [
  { value: 'all', label: 'All Projects' },
  { value: 'water-reticulation', label: 'Water Reticulation' },
  { value: 'hot-tapping', label: 'Hot Tapping' },
  { value: 'civil-structural', label: 'Civil & Structural' },
  { value: 'renovation', label: 'Renovation' },
  { value: 'engineering', label: 'Engineering' },
]

const PLACEHOLDER_PROJECTS: Project[] = [
  { _id: '1', title: 'Sg. Buloh Water Reticulation — Phase 3', slug: { current: '#' }, category: 'water-reticulation', location: 'Shah Alam, Selangor', completionYear: 2024, client: 'Air Selangor' },
  { _id: '2', title: 'Live Main Connection, Puchong Industrial Park', slug: { current: '#' }, category: 'hot-tapping', location: 'Puchong, Selangor', completionYear: 2024 },
  { _id: '3', title: 'Structural Steel Canopy, Klang Valley Distribution Hub', slug: { current: '#' }, category: 'civil-structural', location: 'Klang, Selangor', completionYear: 2023 },
  { _id: '4', title: 'Full Renovation, Damansara Office Tower Level 12–14', slug: { current: '#' }, category: 'renovation', location: 'Damansara, Kuala Lumpur', completionYear: 2023 },
  { _id: '5', title: 'Waterproofing & Facade Repair, Shah Alam Complex', slug: { current: '#' }, category: 'renovation', location: 'Shah Alam, Selangor', completionYear: 2023 },
  { _id: '6', title: 'Reticulation Network Extension — Ara Damansara', slug: { current: '#' }, category: 'water-reticulation', location: 'Ara Damansara, Selangor', completionYear: 2022, client: 'Air Selangor' },
  { _id: '7', title: 'Mezzanine Steel Structure, Subang Industrial', slug: { current: '#' }, category: 'civil-structural', location: 'Subang, Selangor', completionYear: 2022 },
  { _id: '8', title: 'Hot Tap Connection — 400mm DI Main, Petaling Jaya', slug: { current: '#' }, category: 'hot-tapping', location: 'Petaling Jaya, Selangor', completionYear: 2022 },
]

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('all')
  const displayProjects = projects.length > 0 ? projects : PLACEHOLDER_PROJECTS
  const filtered = active === 'all' ? displayProjects : displayProjects.filter(p => p.category === active)

  return (
    <section style={{ padding: '4rem 0 6rem', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: active === f.value ? 600 : 400,
                fontSize: '12px',
                letterSpacing: '0.06em',
                padding: '0.5rem 1.25rem',
                border: 'none',
                cursor: 'pointer',
                background: active === f.value ? '#071E3D' : '#F5F2EC',
                color: active === f.value ? '#ffffff' : '#3A5068',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 300, fontSize: '12px', letterSpacing: '0.08em', color: '#6B849C', marginBottom: '2rem' }}>
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '15px', color: '#6B849C', padding: '3rem 0' }}>
            No projects found.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5px', background: 'rgba(13,27,46,0.08)' }}>
            {filtered.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const bgColors = ['#0D3362', '#1B4F8A', '#071E3D', '#0D3362', '#3A5068', '#1B4F8A']

  return (
    <Link href={`/projects/${project.slug?.current || '#'}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div style={{ background: '#ffffff' }}>
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '16/10', background: bgColors[index % bgColors.length], overflow: 'hidden' }}>
          {project.coverImage ? (
            <Image
              src={urlFor(project.coverImage).width(640).height(400).url()}
              alt={project.title}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.12 }}>
              <svg viewBox="0 0 97 111" height="60" width="52" aria-hidden="true">
                <text x="48.5" y="74" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="60" fontWeight="600" fill="#ffffff">CM</text>
                <line x1="18.5" y1="97" x2="78.5" y2="97" stroke="#C8921A" strokeWidth="1.5" />
              </svg>
            </div>
          )}
          {/* Category badge */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#071E3D', background: '#C8921A', padding: '0.25rem 0.625rem' }}>
              {categoryLabels[project.category] || project.category}
            </span>
          </div>
        </div>
        {/* Content */}
        <div style={{ padding: '1.5rem 1.75rem 2rem' }}>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: '15px', color: '#0D1B2E', lineHeight: 1.4, marginBottom: '0.625rem' }}>
            {project.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {project.location && (
              <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '12px', color: '#6B849C' }}>
                {project.location}
              </p>
            )}
            {project.completionYear && (
              <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '12px', color: '#6B849C' }}>
                {project.completionYear}
              </p>
            )}
          </div>
          {project.description && (
            <p style={{ fontFamily: "'Noto Sans', sans-serif", fontSize: '13px', lineHeight: 1.7, color: '#3A5068', marginTop: '0.75rem' }}>
              {project.description.length > 120 ? project.description.slice(0, 120) + '…' : project.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
