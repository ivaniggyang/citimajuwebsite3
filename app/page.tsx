import { client } from '@/sanity/lib/client'
import { FEATURED_PROJECTS_QUERY, ALL_SERVICES_QUERY } from '@/sanity/lib/queries'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { AboutCTA } from '@/components/sections/AboutCTA'

export const revalidate = 60

export default async function HomePage() {
  const [featuredProjects, services] = await Promise.all([
    client.fetch(FEATURED_PROJECTS_QUERY).catch(() => []),
    client.fetch(ALL_SERVICES_QUERY).catch(() => []),
  ])

  return (
    <>
      <HeroSection
        heading="Infrastructure Built to Last"
        subtext="Citi Maju Group delivers large-scale water reticulation, civil, structural, and renovation works across Klang Valley. CIDB G7 certified. Air Selangor approved."
      />
      <ServicesSection services={services} />
      <FeaturedProjects projects={featuredProjects} />
      <AboutCTA />
    </>
  )
}
