import { SearchIcon } from '@sanity/icons';
import { defineField, defineType} from 'sanity'


export const seo = defineType({
    name: 'seo',
    title: 'SEO & Social',
    type: 'object',
    icon: SearchIcon,
    fields: [
    defineField({
        name: 'metaTitle',
        title: 'Meta Title',
        type: 'string',
        validation: (Rule) => Rule.max(60)
    }),
    defineField({
        name: 'metaDesc', 
        title: 'Meta Description', 
        type: 'text', rows: 3, 
        validation: (Rule) => Rule.max(160)
    }),
    defineField({
        name: 'shareImage', 
        title: 'Share Image (OG Image)', 
        type: 'image' 
    }),
  ]
})