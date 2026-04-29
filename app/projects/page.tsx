import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { ALL_PROJECTS_QUERY } from '@/sanity/lib/queries'
import { PageHero } from '@/components/ui/PageHero'
import { ProjectsGrid } from './ProjectsGrid'
import { getProjectsPage, s } from '@/sanity/lib/fetch'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Project portfolio — water reticulation, civil and structural, and renovation works by Citi Maju Group across Klang Valley.',
}

export default async function ProjectsPage() {
  const [page, projects] = await Promise.all([
    getProjectsPage(),
    client.fetch(ALL_PROJECTS_QUERY, {}, { next: { revalidate: 0 } }).catch(() => []),
  ])

  return (
    <>
      <PageHero
        eyebrow={s(page.heroEyebrow, 'Our Work')}
        heading={s(page.heroHeading, 'Project Portfolio')}
        sub={s(page.heroSub, 'A selection of completed works across water reticulation, civil, structural, and renovation scopes.')}
      />
      <ProjectsGrid
        projects={projects}
        filterAllLabel={s(page.filterAllLabel, 'All Projects')}
        noProjectsText={s(page.noProjectsText, 'No projects found.')}
      />
    </>
  )
}
