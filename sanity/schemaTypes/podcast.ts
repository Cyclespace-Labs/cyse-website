import { DocumentIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const podcast = defineType({
  name: 'podcast',
  type: 'document',
  title: 'Podcast Episode',
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
      title: 'Episode Title',
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
      name: 'thumbnail',
      type: 'image',
      title: 'Episode Thumbnail',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'audioUrl',
      type: 'url',
      title: 'Audio URL',
      group: 'content',
      description: 'Direct link to the audio file or streaming URL',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      type: 'number',
      title: 'Duration (seconds)',
      group: 'content',
      description: 'Episode length in seconds (e.g. 3600 = 1 hour)',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Episode Description',
      group: 'content',
    }),
    defineField({
      name: 'transcript',
      type: 'array',
      title: 'Transcript',
      group: 'content',
      description: 'Optional full episode transcript',
      of: [defineArrayMember({ type: 'block' })],
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
      name: 'series',
      type: 'reference',
      title: 'Podcast Series',
      group: 'metadata',
      to: [{ type: 'podcastSeries' }],
      description: 'The show this episode belongs to',
    }),
    defineField({
      name: 'episodeNumber',
      type: 'number',
      title: 'Episode Number',
      group: 'metadata',
    }),
    defineField({
      name: 'seasonNumber',
      type: 'number',
      title: 'Season Number',
      group: 'metadata',
      initialValue: 1,
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'host',
      type: 'reference',
      title: 'Host',
      group: 'metadata',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'guests',
      type: 'array',
      title: 'Guests',
      group: 'metadata',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
    }),

    // ─── Distribution Group ───────────────────────────────────────────
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured Episode',
      group: 'distribution',
      description: 'Highlight on the podcast hub',
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

    // ─── SEO Group ────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      type: 'seoFields',
      title: 'SEO',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'series.name',
      media: 'thumbnail',
      ep: 'episodeNumber',
    },
    prepare(selection: any) {
      const { title, subtitle, media, ep } = selection;
      return {
        title: title || 'Untitled Episode',
        subtitle: [subtitle, ep ? `Ep. ${ep}` : null].filter(Boolean).join(' — '),
        media,
      };
    },
  },
});
