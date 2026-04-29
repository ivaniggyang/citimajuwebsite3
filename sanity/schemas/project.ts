import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Water Reticulation', value: 'water-reticulation' },
          { title: 'Civil & Structural', value: 'civil-structural' },
          { title: 'Renovation', value: 'renovation' },
          { title: 'Hot Tapping', value: 'hot-tapping' },
          { title: 'Engineering', value: 'engineering' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'entity',
      title: 'Entity',
      type: 'string',
      options: {
        list: [
          { title: 'Citi Maju Engineering', value: 'engineering' },
          { title: 'Citi Maju Construction', value: 'construction' },
        ],
      },
    }),
    defineField({
      name: 'client',
      title: 'Client / Employer',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'completionYear',
      title: 'Completion Year',
      type: 'number',
    }),
    defineField({
      name: 'contractValue',
      title: 'Contract Value (RM)',
      type: 'string',
      description: 'e.g. "RM 2.4 million" — leave blank if confidential',
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Home Page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Completion Year, Newest',
      name: 'completionYearDesc',
      by: [{ field: 'completionYear', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
