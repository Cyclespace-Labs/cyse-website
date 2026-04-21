import { DocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const research = defineType({
  name: 'research',
  type: 'document',
  title: 'Research Report',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'metadata', title: 'Metadata' },
    { name: 'distribution', title: 'Distribution' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ─── Content Group ───────────────────────────────────────────────
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
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
      name: 'titleImage',
      type: 'image',
      title: 'Cover Image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative Text' },
      ],
    }),
    defineField({
      name: 'smallDescription',
      type: 'text',
      title: 'Executive Summary',
      description: 'Short overview shown on cards and listing pages (150-200 chars)',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'keyFindings',
      title: 'Key Findings',
      type: 'array',
      group: 'content',
      description: 'Bullet-point highlights from the report',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'finding',
              type: 'string',
              title: 'Finding',
              validation: (rule: any) => rule.required(),
            },
          ],
          preview: {
            select: { title: 'finding' },
          },
        }),
      ],
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Full Report Content',
      group: 'content',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alternative Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'conclusion',
      type: 'array',
      title: 'Conclusion',
      group: 'content',
      of: [defineArrayMember({ type: 'block' })],
    }),

    // ─── Metadata Group ───────────────────────────────────────────────
    defineField({
      name: 'reportType',
      title: 'Report Type',
      type: 'string',
      group: 'metadata',
      description: 'The category/format of this research report',
      options: {
        list: [
          { title: 'Quarterly Review', value: 'quarterly' },
          { title: 'Annual Report', value: 'annual' },
          { title: 'Market Report', value: 'market' },
          { title: 'Adoption Index', value: 'adoption' },
          { title: 'Exchange Report', value: 'exchange' },
          { title: 'Stablecoin Report', value: 'stablecoin' },
          { title: 'Tokenization Report', value: 'tokenization' },
          { title: 'Network Report', value: 'network' },
          { title: 'Regulatory Report', value: 'regulatory' },
          { title: 'Ecosystem Report', value: 'ecosystem' },
          { title: 'Whitepaper', value: 'whitepaper' },
          { title: 'Case Study', value: 'case-study' },
          { title: 'Deep Dive', value: 'deep-dive' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
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
      name: 'author',
      title: 'Author / Analyst',
      type: 'reference',
      group: 'metadata',
      to: [{ type: 'author' }, { type: 'analystProfile' }],
      description: 'The author or analyst who wrote this report',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'metadata',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'impacts',
      title: 'Market Impact',
      type: 'array',
      group: 'metadata',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'impact' }] })],
      options: { layout: 'tags' },
    }),

    // ─── Distribution Group ───────────────────────────────────────────
    defineField({
      name: 'featured',
      title: 'Featured Report',
      type: 'boolean',
      group: 'distribution',
      description: 'Pin this report to the top of the research hub',
      initialValue: false,
    }),
    defineField({
      name: 'trending',
      title: 'Trending',
      type: 'boolean',
      group: 'distribution',
      description: 'Show in trending research section',
      initialValue: false,
    }),
    defineField({
      name: 'pdfUrl',
      title: 'PDF Download URL',
      type: 'url',
      group: 'distribution',
      description: 'Link to the downloadable PDF version of this report',
    }),
    defineField({
      name: 'dataUrl',
      title: 'Dataset URL',
      type: 'url',
      group: 'distribution',
      description: 'Optional: link to downloadable raw data (CSV, JSON, etc.)',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related News Articles',
      type: 'array',
      group: 'distribution',
      of: [{ type: 'reference', to: [{ type: 'news' }] }],
    }),
    defineField({
      name: 'relatedReports',
      title: 'Related Research Reports',
      type: 'array',
      group: 'distribution',
      of: [{ type: 'reference', to: [{ type: 'research' }] }],
    }),

    // ─── SEO Group ────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'reportType',
      media: 'titleImage',
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection;
      const typeLabels: Record<string, string> = {
        quarterly: 'Quarterly Review',
        annual: 'Annual Report',
        market: 'Market Report',
        adoption: 'Adoption Index',
        exchange: 'Exchange Report',
        stablecoin: 'Stablecoin Report',
        tokenization: 'Tokenization Report',
        network: 'Network Report',
        regulatory: 'Regulatory Report',
        ecosystem: 'Ecosystem Report',
        whitepaper: 'Whitepaper',
        'case-study': 'Case Study',
        'deep-dive': 'Deep Dive',
      };
      return {
        title: title || 'Untitled Report',
        subtitle: subtitle ? typeLabels[subtitle] || subtitle : 'No type set',
        media,
      };
    },
  },
})
