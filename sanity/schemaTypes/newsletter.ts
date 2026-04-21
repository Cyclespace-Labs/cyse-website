import { EnvelopeIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const newsletter = defineType({
  name: 'newsletter',
  type: 'document',
  title: 'Newsletter',
  icon: EnvelopeIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'metadata', title: 'Metadata' },
    { name: 'distribution', title: 'Distribution' },
  ],
  fields: [
    // ─── Content Group ───────────────────────────────────────────────
    defineField({
      name: 'title',
      type: 'string',
      title: 'Newsletter Title',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'content',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      group: 'content',
      description: 'Preview text shown in email clients and listing pages',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Newsletter Content',
      group: 'content',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alternative Text' },
          ],
        }),
      ],
    }),

    // ─── Metadata Group ───────────────────────────────────────────────
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      group: 'metadata',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'issueNumber',
      type: 'number',
      title: 'Issue Number',
      group: 'metadata',
    }),
    defineField({
      name: 'frequency',
      type: 'string',
      title: 'Frequency',
      group: 'metadata',
      options: {
        list: [
          { title: 'Daily', value: 'daily' },
          { title: 'Weekly', value: 'weekly' },
          { title: 'Bi-weekly', value: 'bi-weekly' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'Special Edition', value: 'special' },
        ],
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      title: 'Author',
      group: 'metadata',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      options: { layout: 'tags' },
    }),

    // ─── Distribution Group ───────────────────────────────────────────
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured',
      group: 'distribution',
      initialValue: false,
    }),
    defineField({
      name: 'relatedArticles',
      type: 'array',
      title: 'Related News Articles',
      group: 'distribution',
      of: [{ type: 'reference', to: [{ type: 'news' }] }],
    }),
    defineField({
      name: 'relatedResearch',
      type: 'array',
      title: 'Related Research Reports',
      group: 'distribution',
      of: [{ type: 'reference', to: [{ type: 'research' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issueNumber',
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Untitled Newsletter',
        subtitle: subtitle ? `Issue #${subtitle}` : 'No issue number',
      };
    },
  },
});
