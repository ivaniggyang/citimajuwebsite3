import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // HERO
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      group: 'hero',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      initialValue: 'Who We Are',
    }),

    // MAIN ABOUT
    defineField({
      name: 'mainBody',
      title: 'Main About Paragraphs',
      description: 'The main body text on the left side of the page. Add or remove paragraphs freely.',
      type: 'array',
      group: 'main',
      of: [{ type: 'text', rows: 3 }],
      initialValue: [
        'Citi Maju Group is built on three things: technical competence, certified credibility, and consistent delivery. We do not sell aspiration — we earn trust through track record.',
        'Operating across Klang Valley, we handle large-scale water reticulation and hot tapping works, civil and structural projects for developers and main contractors, and the full range of renovation works from leak remediation to full fit-out.',
        "Our CIDB Grade G7 certification — Malaysia's highest contractor grade — reflects our capacity to undertake projects of any size. We are a company that does the work, gets it right, and delivers on time.",
      ],
    }),
    defineField({
      name: 'pullQuoteEyebrow',
      title: 'Pull-Quote Panel Eyebrow',
      type: 'string',
      group: 'main',
      initialValue: 'Brand Promise',
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull Quote',
      type: 'text',
      rows: 3,
      group: 'main',
      initialValue: 'Authoritative, not arrogant. Precise, not cold. Restrained, not dull.',
    }),
    defineField({
      name: 'pullQuoteSub',
      title: 'Pull-Quote Sub-text',
      type: 'text',
      rows: 2,
      group: 'main',
      initialValue: 'These three principles guide how we work, how we communicate, and what we deliver.',
    }),

    // ENTITIES
    defineField({
      name: 'entitiesEyebrow',
      title: 'Entities Section Eyebrow',
      type: 'string',
      group: 'entities',
      initialValue: 'Our Entities',
    }),
    defineField({
      name: 'entitiesHeading',
      title: 'Entities Section Heading',
      type: 'string',
      group: 'entities',
      initialValue: 'One Group, Two Entities',
    }),
    defineField({
      name: 'entities',
      title: 'Entity Cards',
      description: 'The two (or more) registered entities. Each card shows focus, name, and description.',
      type: 'array',
      group: 'entities',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'focus', type: 'string', title: 'Focus (gold eyebrow)' },
            { name: 'name', type: 'string', title: 'Entity Name' },
            { name: 'description', type: 'text', rows: 4, title: 'Description' },
          ],
          preview: { select: { title: 'name', subtitle: 'focus' } },
        },
      ],
      initialValue: [
        {
          focus: 'Engineering Works',
          name: 'Citi Maju Engineering Sdn Bhd',
          description: 'Handles water reticulation, hot tapping, pipeline works, and engineering-led infrastructure projects. The primary contracting entity for Air Selangor and utility-related scopes.',
        },
        {
          focus: 'Construction Works',
          name: 'Citi Maju Construction Sdn Bhd',
          description: 'Handles civil and structural works, building renovation, metal structure fabrication, and all construction-related scopes for property developers, main contractors, and building owners.',
        },
      ],
    }),
    defineField({
      name: 'entitiesNote',
      title: 'Note Below Entity Cards',
      type: 'string',
      group: 'entities',
      initialValue: 'In all public-facing contexts, these entities operate as one group — Citi Maju Group.',
    }),

    // CREDENTIALS
    defineField({
      name: 'credentialsEyebrow',
      title: 'Credentials Section Eyebrow',
      type: 'string',
      group: 'credentials',
      initialValue: 'Credentials',
    }),
    defineField({
      name: 'credentialsHeading',
      title: 'Credentials Section Heading',
      type: 'string',
      group: 'credentials',
      initialValue: 'Our Certifications',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials List',
      description: 'Add, remove, edit. Each item appears as a tile on the dark credentials grid.',
      type: 'array',
      group: 'credentials',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Status / Value (gold pill)' },
            { name: 'description', type: 'text', rows: 3, title: 'Description' },
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
      initialValue: [
        { label: 'CIDB Grade', value: 'G7', description: "Malaysia's highest contractor grade, qualifying CMG for government and large-scale private projects without limit on contract value." },
        { label: 'Air Selangor Approval', value: 'Active', description: 'Approved contractor for water works under Pengurusan Air Selangor Sdn Bhd. Required for all water reticulation works in Selangor.' },
        { label: 'SSM Registration', value: 'Active', description: 'Both Citi Maju Engineering Sdn Bhd and Citi Maju Construction Sdn Bhd are registered with the Companies Commission of Malaysia.' },
        { label: 'CIDB Registration', value: 'Active', description: 'Registered with the Construction Industry Development Board Malaysia under the relevant categories of work.' },
      ],
    }),

    // CTA
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      group: 'cta',
      initialValue: 'Have a project in mind?',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
      rows: 2,
      group: 'cta',
      initialValue: 'We are happy to discuss scope and feasibility. Get in touch and we will respond promptly.',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA Button Label',
      type: 'string',
      group: 'cta',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'ctaButtonHref',
      title: 'CTA Button Link',
      type: 'string',
      group: 'cta',
      initialValue: '/contact',
    }),
  ],
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'main', title: 'Main About' },
    { name: 'entities', title: 'Entities' },
    { name: 'credentials', title: 'Credentials' },
    { name: 'cta', title: 'CTA' },
  ],
  preview: { prepare: () => ({ title: 'About Page Content' }) },
})
