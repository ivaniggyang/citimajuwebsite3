import { client } from '@/sanity/lib/client'
import { FEATURED_PROJECTS_QUERY, ALL_SERVICES_QUERY } from '@/sanity/lib/queries'
import { getHomePage, s } from '@/sanity/lib/fetch'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { AboutCTA } from '@/components/sections/AboutCTA'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [page, featuredProjects, services] = await Promise.all([
    getHomePage(),
    client.fetch(FEATURED_PROJECTS_QUERY, {}, { next: { revalidate: 0 } }).catch(() => []),
    client.fetch(ALL_SERVICES_QUERY, {}, { next: { revalidate: 0 } }).catch(() => []),
  ])

  return (
    <>
      <HeroSection
        eyebrow={s(page.heroEyebrow, 'Citi Maju Group')}
        heading={s(page.heroHeading, 'Engineering and construction across Klang Valley')}
        subtext={s(page.heroSubtext, 'Citi Maju Group is a CIDB G7 contractor delivering water reticulation, civil and structural works, and renovation projects for developers, municipalities, and main contractors.')}
        primaryCtaLabel={s(page.heroPrimaryCtaLabel, 'View Our Projects')}
        primaryCtaHref={s(page.heroPrimaryCtaHref, '/projects')}
        secondaryCtaLabel={s(page.heroSecondaryCtaLabel, 'Get In Touch')}
        secondaryCtaHref={s(page.heroSecondaryCtaHref, '/contact')}
        stats={Array.isArray(page.heroStats) && page.heroStats.length > 0 ? page.heroStats : [
          { value: 'CIDB G7', label: 'Highest Contractor Grade' },
          { value: 'Air Selangor', label: 'Approved Contractor' },
          { value: 'Klang Valley', label: 'Operational Coverage' },
        ]}
      />
      <ServicesSection
        eyebrow={s(page.servicesEyebrow, 'Our Services')}
        heading={s(page.servicesHeading, 'What We Do')}
        viewAllLabel={s(page.servicesViewAllLabel, 'View All Services →')}
        services={services}
      />
      <FeaturedProjects
        eyebrow={s(page.projectsEyebrow, 'Our Work')}
        heading={s(page.projectsHeading, 'Selected Projects')}
        viewAllLabel={s(page.projectsViewAllLabel, 'View All Projects →')}
        projects={featuredProjects}
      />
      <AboutCTA
        eyebrow={s(page.aboutEyebrow, 'About Us')}
        heading={s(page.aboutHeading, 'Trusted. Certified. Delivered.')}
        body={Array.isArray(page.aboutBody) && page.aboutBody.length > 0 ? page.aboutBody : [
          'Citi Maju Group is a CIDB Grade G7 certified contractor with a track record of large-scale infrastructure projects across Klang Valley.',
          'We deliver water reticulation, civil and structural works, and full renovation services — with the credentials and capacity to handle projects of any scale.',
        ]}
        primaryCtaLabel={s(page.aboutPrimaryCtaLabel, 'Learn More →')}
        primaryCtaHref={s(page.aboutPrimaryCtaHref, '/about')}
        secondaryCtaLabel={s(page.aboutSecondaryCtaLabel, 'Get In Touch')}
        secondaryCtaHref={s(page.aboutSecondaryCtaHref, '/contact')}
        credentialsEyebrow={s(page.credentialsEyebrow, 'Credentials')}
        credentials={Array.isArray(page.credentials) && page.credentials.length > 0 ? page.credentials : [
          { label: 'CIDB Grade', value: 'G7', sub: "Malaysia's highest contractor grade" },
          { label: 'Air Selangor', value: 'Approved', sub: 'Water works contractor approval' },
          { label: 'Registration', value: 'Active', sub: 'SSM registered entities' },
          { label: 'Coverage', value: 'Klang Valley', sub: 'Primary operational area' },
        ]}
      />
    </>
  )
}
