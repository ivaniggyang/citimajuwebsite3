import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ALL_PROJECTS_QUERY } from '@/sanity/lib/queries'
import { PageHero } from '@/components/ui/PageHero'
import { ProjectsGrid } from './ProjectsGrid'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Project portfolio — water reticulation, civil and structural, and renovation works by Citi Maju Group across Klang Valley.',
}

export const revalidate = 60

export default async function ProjectsPage() {
  const projects = await client.fetch(ALL_PROJECTS_QUERY).catch(() => [])

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        heading="Project Portfolio"
        sub="A selection of completed works across water reticulation, civil, structural, and renovation scopes."
      />
      <ProjectsGrid projects={projects} />
    </>
  )
}
