import { defineField, defineType } from 'sanity'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', initialValue: 'Our Work' }),
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', initialValue: 'Project Portfolio' }),
    defineField({ name: 'heroSub', title: 'Hero Subtext', type: 'text', rows: 2, initialValue: 'A selection of completed works across water reticulation, civil, structural, and renovation scopes.' }),
    defineField({ name: 'filterAllLabel', title: 'All-Projects Filter Label', type: 'string', initialValue: 'All Projects' }),
    defineField({ name: 'noProjectsText', title: 'Empty State Text', type: 'string', initialValue: 'No projects found.' }),
  ],
  preview: { prepare: () => ({ title: 'Projects Page Content' }) },
})
