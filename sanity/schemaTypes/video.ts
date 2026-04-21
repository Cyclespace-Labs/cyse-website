import { PlayIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const video = defineType({
  name: 'video',
  type: 'document',
  title: 'Video',
  icon: PlayIcon,
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
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      group: 'content',
      description: 'YouTube or Vimeo embed/watch URL',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      type: 'number',
      title: 'Duration (seconds)',
      group: 'content',
      description: 'Video length in seconds (e.g. 360 = 6 min)',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      group: 'content',
    }),
    defineField({
      name: 'transcript',
      type: 'array',
      title: 'Transcript',
      group: 'content',
      description: 'Optional full transcript',
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
      title: 'Video Series',
      group: 'metadata',
      to: [{ type: 'videoSeries' }],
      description: 'The show this video belongs to',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      group: 'metadata',
      to: [{ type: 'category' }],
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
      title: 'Host / Presenter',
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
      title: 'Featured Video',
      group: 'distribution',
      description: 'Highlight on the video hub',
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
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Untitled Video',
        subtitle: subtitle || 'No series',
        media,
      };
    },
  },
});
