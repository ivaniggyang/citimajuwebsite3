import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', initialValue: 'Reach Us' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', initialValue: 'Get In Touch' }),
    defineField({ name: 'heroSub', title: 'Hero Subtext', type: 'text', rows: 3, initialValue: 'For project inquiries, tender submissions, or general questions — we are happy to discuss scope and feasibility.' }),

    // Contact info labels
    defineField({ name: 'whatsappLabel', title: 'WhatsApp Label', type: 'string', initialValue: 'WhatsApp' }),
    defineField({ name: 'whatsappNote', title: 'WhatsApp Note', type: 'string', initialValue: 'Tap to open a WhatsApp conversation directly.' }),
    defineField({ name: 'phoneLabel', title: 'Phone Label', type: 'string', initialValue: 'Phone' }),
    defineField({ name: 'emailLabel', title: 'Email Label', type: 'string', initialValue: 'Email' }),
    defineField({ name: 'officeLabel', title: 'Office Label', type: 'string', initialValue: 'Office' }),
    defineField({ name: 'officeAddress', title: 'Office Address', type: 'text', rows: 2, initialValue: 'Klang Valley, Selangor\nMalaysia' }),

    // Note panel
    defineField({ name: 'noteHeading', title: 'Bottom Note Heading', type: 'string', initialValue: 'CIDB Grade G7 · Air Selangor Approved' }),
    defineField({ name: 'noteText', title: 'Bottom Note Text', type: 'text', rows: 3, initialValue: 'We handle projects of any scale. For tender submissions, please include scope, location, and timeline in your inquiry.' }),

    // Form copy
    defineField({ name: 'formNameLabel', title: 'Form: Name Label', type: 'string', initialValue: 'Full Name' }),
    defineField({ name: 'formCompanyLabel', title: 'Form: Company Label', type: 'string', initialValue: 'Company' }),
    defineField({ name: 'formEmailLabel', title: 'Form: Email Label', type: 'string', initialValue: 'Email Address' }),
    defineField({ name: 'formPhoneLabel', title: 'Form: Phone Label', type: 'string', initialValue: 'Phone Number' }),
    defineField({ name: 'formSubjectLabel', title: 'Form: Subject Label', type: 'string', initialValue: 'Subject' }),
    defineField({ name: 'formMessageLabel', title: 'Form: Message Label', type: 'string', initialValue: 'Message' }),
    defineField({ name: 'formSubmitLabel', title: 'Form: Submit Button Label', type: 'string', initialValue: 'Send Inquiry' }),
    defineField({ name: 'formSuccessHeading', title: 'Form: Success Heading', type: 'string', initialValue: 'Thank you.' }),
    defineField({ name: 'formSuccessText', title: 'Form: Success Text', type: 'text', rows: 2, initialValue: 'Your inquiry has been received. We will be in touch shortly.' }),
    defineField({ name: 'formMessagePlaceholder', title: 'Form: Message Placeholder', type: 'string', initialValue: 'Please describe your project scope, location, and timeline.' }),
    defineField({ name: 'formSubjectPlaceholder', title: 'Form: Subject Placeholder', type: 'string', initialValue: 'e.g. Water reticulation project inquiry' }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page Content' }) },
})
