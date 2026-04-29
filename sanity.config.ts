import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  name: 'cmg-studio',
  title: 'Citi Maju — Content Studio',
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem().title('Home Page').child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem().title('About Page').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem().title('Services Page').child(S.document().schemaType('servicesPage').documentId('servicesPage')),
            S.listItem().title('Projects Page').child(S.document().schemaType('projectsPage').documentId('projectsPage')),
            S.listItem().title('Contact Page').child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.divider(),
            S.documentTypeListItem('project').title('Projects (Portfolio)'),
            S.documentTypeListItem('service').title('Services (Listings)'),
          ]),
    }),
    visionTool(),
  ],
})
