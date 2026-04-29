import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Citi Maju Group',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Trusted. Certified. Delivered.',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number (with country code, no spaces)',
      type: 'string',
      description: 'e.g. 60127836562',
      initialValue: '60127836562',
    }),
    defineField({
      name: 'email',
      title: 'Inquiry Email',
      type: 'string',
      initialValue: 'inquiry@citimaju.com',
    }),
    defineField({
      name: 'address',
      title: 'Office Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'registrationNo',
      title: 'SSM Registration Number',
      type: 'string',
    }),
    defineField({
      name: 'cidbGrade',
      title: 'CIDB Grade',
      type: 'string',
      initialValue: 'G7',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading (Home)',
      type: 'string',
      initialValue: 'Infrastructure Built to Last',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext (Home)',
      type: 'text',
      rows: 2,
      initialValue: 'Citi Maju Group delivers large-scale water reticulation, civil, structural, and renovation works across Klang Valley. CIDB G7 certified. Air Selangor approved.',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
      initialValue: 'Who We Are',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'showCidbBadge',
      title: 'Show CIDB Badge on Home',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showAirSelangorBadge',
      title: 'Show Air Selangor Badge on Home',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'companyName' },
  },
})
