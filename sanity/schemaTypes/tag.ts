// app/schemas/tag.ts
import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const tag = defineType({
  name: 'tag',
  type: 'document',
  title: 'Tag',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Tag Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'group',
      type: 'string',
      title: 'Tag Group',
      description: 'Organizes tags into logical groups for filtering',
      options: {
        list: [
          { title: 'Tokens & Blockchains', value: 'tokens' },
          { title: 'Market Activity', value: 'market' },
          { title: 'DeFi & Infrastructure', value: 'defi' },
          { title: 'Regulation & Compliance', value: 'regulation' },
          { title: 'Companies & Institutions', value: 'companies' },
          { title: 'Key Figures', value: 'people' },
          { title: 'Events & Milestones', value: 'events' },
          { title: 'Geography', value: 'geography' },
          { title: 'Content Type', value: 'content-type' },
          { title: 'Research Topics', value: 'research' },
          { title: 'Video Shows', value: 'video-shows' },
          { title: 'Podcast Series', value: 'podcast-series' },
          { title: 'Sentiment', value: 'sentiment' },
        ],
      },
    }),
    defineField({
      name: 'color',
      type: 'string',
      title: 'Color',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Red', value: 'red' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Purple', value: 'purple' },
          { title: 'Orange', value: 'orange' },
          { title: 'Zinc', value: 'zinc' },
        ],
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Optional description for this tag',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'group' },
  },
})