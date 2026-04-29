import { defineField, defineType } from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', initialValue: 'What We Do' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', initialValue: 'Our Services' }),
    defineField({ name: 'heroSub', title: 'Hero Subtext', type: 'text', rows: 2, initialValue: 'From water mains to structural steel — we cover the full scope of infrastructure and building works.' }),
    defineField({ name: 'ctaHeading', title: 'CTA Heading', type: 'string', initialValue: 'Ready to discuss your project?' }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'text', rows: 2, initialValue: 'If you have a project in mind, we are happy to discuss scope and feasibility.' }),
    defineField({ name: 'ctaButtonLabel', title: 'CTA Button Label', type: 'string', initialValue: 'Get In Touch' }),
    defineField({ name: 'ctaButtonHref', title: 'CTA Button Link', type: 'string', initialValue: '/contact' }),
  ],
  preview: { prepare: () => ({ title: 'Services Page Content' }) },
})
