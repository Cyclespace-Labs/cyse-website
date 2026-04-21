import { PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const videoSeries = defineType({
  name: 'videoSeries',
  type: 'document',
  title: 'Video Series',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Series Name',
      description: 'e.g. "First Mover", "Markets Daily", "The Hash"',
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
      name: 'thumbnail',
      type: 'image',
      title: 'Series Thumbnail',
      options: { hotspot: true },
    }),
    defineField({
      name: 'host',
      type: 'reference',
      title: 'Host',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'youtubeChannel',
      type: 'url',
      title: 'YouTube Channel URL',
    }),
    defineField({
      name: 'youtubePlaylist',
      type: 'url',
      title: 'YouTube Playlist URL',
    }),
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Active Series',
      description: 'Is this series currently active/publishing?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'thumbnail',
    },
  },
});
