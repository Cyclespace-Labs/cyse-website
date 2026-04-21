import { PlayIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const podcastSeries = defineType({
  name: 'podcastSeries',
  type: 'document',
  title: 'Podcast Series',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Series Name',
      description: 'e.g. "The Breakdown", "Unchained", "Crypto Crooks"',
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
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Podcast Logo',
      options: { hotspot: true },
    }),
    defineField({
      name: 'host',
      type: 'reference',
      title: 'Host',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'rssUrl',
      type: 'url',
      title: 'RSS Feed URL',
    }),
    defineField({
      name: 'platforms',
      type: 'array',
      title: 'Platforms',
      description: 'Where this podcast is available',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Spotify', value: 'spotify' },
                  { title: 'Apple Podcasts', value: 'apple' },
                  { title: 'Google Podcasts', value: 'google' },
                  { title: 'Amazon Music', value: 'amazon' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'RSS', value: 'rss' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        }),
      ],
    }),
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Active Series',
      description: 'Is this podcast currently publishing?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
});
