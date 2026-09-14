import { defineField, defineType } from 'sanity'

// A managed label/category. Editors add or remove these documents in the
// Studio; Projects and Services reference them, and the website's filters
// and groupings are derived from whichever categories are in use.
export const category = defineType({
  name: 'category',
  title: 'Category / Label',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Label',
      type: 'string',
      description: 'Display name, e.g. "Water Reticulation".',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Stable machine value used for filtering. Auto-generated from the label.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'appliesTo',
      title: 'Applies To',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Projects', value: 'project' },
          { title: 'Services', value: 'service' },
        ],
        layout: 'grid',
      },
      description: 'Which sections this label is available for.',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in filters and groupings.',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', appliesTo: 'appliesTo' },
    prepare({ title, appliesTo }) {
      const scopes = Array.isArray(appliesTo) ? appliesTo : []
      const labelMap: Record<string, string> = { project: 'Projects', service: 'Services' }
      const subtitle = scopes.map((v: string) => labelMap[v] || v).join(', ')
      return { title, subtitle }
    },
  },
})
