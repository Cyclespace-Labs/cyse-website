// @ts-nocheck
import { SearchIcon } from '@sanity/icons';
import { defineField, defineType, defineArrayMember} from 'sanity'


export const seo = defineType({
    name: 'seo',
    title: 'SEO & Social',
    type: 'object',
    icon: SearchIcon,
    fields: [
    defineField({
        name: 'title',
        title: 'Meta Title',
        type: 'string',
        validation: (Rule) => Rule.max(60)
    }),
    defineField({
        name: 'description', 
        title: 'Meta Description', 
        type: 'text',
        validation: (Rule) => Rule.max(160)
    }),
    defineField({
        name: 'keywords',
        title: 'Keywords',
        type: 'array',
        of: [defineArrayMember({ type: 'string' })]
    }),
    defineField({
        name: 'canonicalUrl',
        title: 'Canonical URL',
        type: 'url'
    }),
    defineField({
        name: 'openGraph',
        title: 'Open Graph',
        type: 'object',
        fields: [
            defineField({ name: 'title', title: 'OG Title', type: 'string' }),
            defineField({ name: 'description', title: 'OG Description', type: 'text' }),
            defineField({ name: 'url', title: 'OG URL', type: 'url' }),
            defineField({ name: 'image', title: 'OG Image', type: 'image' }),
            defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
            defineField({ name: 'type', title: 'OG Type', type: 'string' })
        ]
    }),
    defineField({
        name: 'twitter',
        title: 'Twitter Card',
        type: 'object',
        fields: [
            defineField({ name: 'card', title: 'Card Type', type: 'string' }),
            defineField({ name: 'site', title: 'Site Handle', type: 'string' }),
            defineField({ name: 'creator', title: 'Creator Handle', type: 'string' }),
            defineField({ name: 'title', title: 'Twitter Title', type: 'string' }),
            defineField({ name: 'description', title: 'Twitter Description', type: 'text' }),
            defineField({ name: 'image', title: 'Twitter Image', type: 'image' })
        ]
    }),
    defineField({
        name: 'robots',
        title: 'Robots Settings',
        type: 'object',
        fields: [
            defineField({ name: 'noIndex', title: 'No Index', type: 'boolean' }),
            defineField({ name: 'noFollow', title: 'No Follow', type: 'boolean' })
        ]
    }),
    defineField({
        name: 'metaAttributes',
        title: 'Custom Meta Attributes',
        type: 'array',
        of: [
            defineArrayMember({
                type: 'object',
                name: 'attribute',
                fields: [
                    defineField({ name: 'key', title: 'Key', type: 'string' }),
                    defineField({ name: 'value', title: 'Value', type: 'string' })
                ]
            })
        ]
    })
  ]
})