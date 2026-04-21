import { TargetIcon } from '@sanity/icons'
import { defineField, defineType} from 'sanity'


export const impact = defineType({
    name: 'impact',
    type: 'document',
    title: 'Impact',
    icon: TargetIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Impact Name',
            description: 'e.g. Positive, Negative, Neutral',
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
            name: 'color',
            type: 'string',
            title: 'Color',
            description: 'Green = Positive/Bullish, Red = Negative/Bearish, Zinc = Neutral',
            options: {
                list: [
                    { title: 'Green (Positive/Bullish)', value: 'green' },
                    { title: 'Red (Negative/Bearish)', value: 'red' },
                    { title: 'Zinc (Neutral)', value: 'zinc' },
                    { title: 'Yellow (Cautionary)', value: 'yellow' },
                    { title: 'Blue (Informational)', value: 'blue' },
                ],
            },
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Description',
            description: 'Describe when to use this impact label',
        }),
    ],
    preview: {
        select: { title: 'name', subtitle: 'color' },
    },
})