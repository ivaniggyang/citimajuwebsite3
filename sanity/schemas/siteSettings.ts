import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // COMPANY
    defineField({ name: 'companyName', title: 'Company Name', type: 'string', group: 'company', initialValue: 'Citi Maju Group' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'company', initialValue: 'Trusted. Certified. Delivered.' }),

    // CONTACT
    defineField({ name: 'phone', title: 'Phone Number (display, e.g. +6012-783 6562)', type: 'string', group: 'contact', initialValue: '+6012-783 6562' }),
    defineField({ name: 'phoneDial', title: 'Phone Number (dial format, e.g. +60127836562)', type: 'string', group: 'contact', initialValue: '+60127836562' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (no plus sign, e.g. 60127836562)', type: 'string', group: 'contact', initialValue: '60127836562' }),
    defineField({ name: 'email', title: 'Inquiry Email', type: 'string', group: 'contact', initialValue: 'inquiry@citimaju.com' }),
    defineField({ name: 'address', title: 'Office Address', type: 'text', rows: 3, group: 'contact' }),

    // NAV
    defineField({ name: 'navAbout', title: 'About Link', type: 'string', group: 'nav', initialValue: 'About' }),
    defineField({ name: 'navServices', title: 'Services Link', type: 'string', group: 'nav', initialValue: 'Services' }),
    defineField({ name: 'navProjects', title: 'Projects Link', type: 'string', group: 'nav', initialValue: 'Projects' }),
    defineField({ name: 'navContact', title: 'Contact Link', type: 'string', group: 'nav', initialValue: 'Contact' }),
    defineField({ name: 'navCtaLabel', title: 'Header CTA Button Label', type: 'string', group: 'nav', initialValue: 'Get In Touch' }),

    // FOOTER
    defineField({ name: 'footerCredentialsLine', title: 'Footer Credentials Line', type: 'text', rows: 2, group: 'footer', initialValue: 'CIDB Grade G7\nAir Selangor Approved Contractor' }),
    defineField({ name: 'footerNavHeading', title: 'Footer Navigation Heading', type: 'string', group: 'footer', initialValue: 'Navigation' }),
    defineField({ name: 'footerContactHeading', title: 'Footer Contact Heading', type: 'string', group: 'footer', initialValue: 'Contact' }),
    defineField({ name: 'footerCopyrightSuffix', title: 'Copyright Suffix (after © year)', type: 'string', group: 'footer', initialValue: 'All rights reserved.' }),
    defineField({ name: 'footerEntitiesLine', title: 'Footer Entities Line', type: 'string', group: 'footer', initialValue: 'Citi Maju Engineering Sdn Bhd & Citi Maju Construction Sdn Bhd' }),
  ],
  groups: [
    { name: 'company', title: 'Company', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'nav', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
  ],
  preview: { select: { title: 'companyName' } },
})
