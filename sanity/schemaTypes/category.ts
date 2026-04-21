import { ListIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const category = defineType({
    name: 'category',
    type: 'document',
    title: 'Category',
    icon: ListIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name of Category',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
              source: 'name',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
            description: 'Lucide icon name (e.g. BarChart2, FileText, Globe)',
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'string',
            options: {
                list: [
                    { title: 'Blue', value: 'blue' },
                    { title: 'Green', value: 'green' },
                    { title: 'Red', value: 'red' },
                    { title: 'Yellow', value: 'yellow' },
                    { title: 'Purple', value: 'purple' },
                    { title: 'Orange', value: 'orange' },
                    { title: 'Zinc', value: 'zinc' },
                    { title: 'Indigo', value: 'indigo' },
                ],
            },
        }),
        defineField({
            name: 'contentType',
            title: 'Content Type',
            type: 'string',
            description: 'The type of content this category applies to',
            options: {
                list: [
                    { title: 'News Article', value: 'news' },
                    { title: 'Research Report', value: 'research' },
                    { title: 'Video', value: 'video' },
                    { title: 'Podcast', value: 'podcast' },
                    { title: 'Newsletter', value: 'newsletter' },
                    { title: 'All', value: 'all' },
                ],
            },
            initialValue: 'news',
        }),
    ],
    preview: {
        select: { title: 'name', subtitle: 'contentType' },
    },
})