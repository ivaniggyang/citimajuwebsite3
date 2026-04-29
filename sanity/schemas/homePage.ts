import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // HERO
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow (small text above heading)',
      type: 'string',
      group: 'hero',
      initialValue: 'Citi Maju Group',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading (the big H1)',
      type: 'string',
      group: 'hero',
      initialValue: 'Engineering and construction across Klang Valley',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue: 'Citi Maju Group is a CIDB G7 contractor delivering water reticulation, civil and structural works, and renovation projects for developers, municipalities, and main contractors.',
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Primary Button Label',
      type: 'string',
      group: 'hero',
      initialValue: 'View Our Projects',
    }),
    defineField({
      name: 'heroPrimaryCtaHref',
      title: 'Primary Button Link',
      type: 'string',
      group: 'hero',
      initialValue: '/projects',
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary Button Label',
      type: 'string',
      group: 'hero',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'heroSecondaryCtaHref',
      title: 'Secondary Button Link',
      type: 'string',
      group: 'hero',
      initialValue: '/contact',
    }),
    defineField({
      name: 'heroStats',
      title: 'Hero Stats Strip',
      description: 'Small facts shown below the hero. Add, remove, or rearrange freely. Drop the value or label blank to skip.',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value (large)' },
            { name: 'label', type: 'string', title: 'Label (small caps)' },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      initialValue: [
        { value: 'CIDB G7', label: 'Highest Contractor Grade' },
        { value: 'Air Selangor', label: 'Approved Contractor' },
        { value: 'Klang Valley', label: 'Operational Coverage' },
      ],
    }),

    // SERVICES SECTION
    defineField({
      name: 'servicesEyebrow',
      title: 'Services Eyebrow',
      type: 'string',
      group: 'services',
      initialValue: 'Our Services',
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Services Heading',
      type: 'string',
      group: 'services',
      initialValue: 'What We Do',
    }),
    defineField({
      name: 'servicesViewAllLabel',
      title: 'View All Services Link Label',
      type: 'string',
      group: 'services',
      initialValue: 'View All Services →',
    }),

    // PROJECTS SECTION
    defineField({
      name: 'projectsEyebrow',
      title: 'Projects Eyebrow',
      type: 'string',
      group: 'projects',
      initialValue: 'Our Work',
    }),
    defineField({
      name: 'projectsHeading',
      title: 'Projects Heading',
      type: 'string',
      group: 'projects',
      initialValue: 'Selected Projects',
    }),
    defineField({
      name: 'projectsViewAllLabel',
      title: 'View All Projects Link Label',
      type: 'string',
      group: 'projects',
      initialValue: 'View All Projects →',
    }),

    // ABOUT CTA SECTION
    defineField({
      name: 'aboutEyebrow',
      title: 'About Section Eyebrow',
      type: 'string',
      group: 'aboutCta',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
      group: 'aboutCta',
      initialValue: 'Trusted. Certified. Delivered.',
    }),
    defineField({
      name: 'aboutBody',
      title: 'About Body Paragraphs',
      description: 'Add one or more paragraphs.',
      type: 'array',
      group: 'aboutCta',
      of: [{ type: 'text', rows: 3 }],
      initialValue: [
        'Citi Maju Group is a CIDB Grade G7 certified contractor with a track record of large-scale infrastructure projects across Klang Valley.',
        'We deliver water reticulation, civil and structural works, and full renovation services — with the credentials and capacity to handle projects of any scale.',
      ],
    }),
    defineField({
      name: 'aboutPrimaryCtaLabel',
      title: 'Primary Button Label',
      type: 'string',
      group: 'aboutCta',
      initialValue: 'Learn More →',
    }),
    defineField({
      name: 'aboutPrimaryCtaHref',
      title: 'Primary Button Link',
      type: 'string',
      group: 'aboutCta',
      initialValue: '/about',
    }),
    defineField({
      name: 'aboutSecondaryCtaLabel',
      title: 'Secondary Button Label',
      type: 'string',
      group: 'aboutCta',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'aboutSecondaryCtaHref',
      title: 'Secondary Button Link',
      type: 'string',
      group: 'aboutCta',
      initialValue: '/contact',
    }),
    defineField({
      name: 'credentialsEyebrow',
      title: 'Credentials Panel Eyebrow',
      type: 'string',
      group: 'aboutCta',
      initialValue: 'Credentials',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials Panel Items',
      description: 'Editable list of credentials shown in the dark panel beside the about text.',
      type: 'array',
      group: 'aboutCta',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label (top-left)' },
            { name: 'value', type: 'string', title: 'Value (top-right, large)' },
            { name: 'sub', type: 'string', title: 'Sub-text (bottom-right)' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
      initialValue: [
        { label: 'CIDB Grade', value: 'G7', sub: "Malaysia's highest contractor grade" },
        { label: 'Air Selangor', value: 'Approved', sub: 'Water works contractor approval' },
        { label: 'Registration', value: 'Active', sub: 'SSM registered entities' },
        { label: 'Coverage', value: 'Klang Valley', sub: 'Primary operational area' },
      ],
    }),
  ],
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'services', title: 'Services Section' },
    { name: 'projects', title: 'Projects Section' },
    { name: 'aboutCta', title: 'About / Credentials Section' },
  ],
  preview: { prepare: () => ({ title: 'Home Page Content' }) },
})
