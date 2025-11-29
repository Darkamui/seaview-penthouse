import { defineField, defineType } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const FEATURE_OPTIONS = [
  { title: 'Living Space', value: 'livingSpace' },
  { title: 'Bedroom', value: 'bedroom' },
  { title: 'Balcony', value: 'balcony' },
  { title: 'Location', value: 'location' },
]

export default defineType({
  name: 'featureImage',
  title: 'Feature Images',
  type: 'document',
  icon: SparklesIcon,

  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'feature',
      title: 'Feature',
      type: 'string',
      options: {
        list: FEATURE_OPTIONS,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'object',
      fields: [
        { name: 'he', type: 'string', title: 'Hebrew' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'fr', type: 'string', title: 'French' },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'feature',
      media: 'image',
      order: 'order',
    },
    prepare({ title, media, order }) {
      return {
        title: `${title} (Order: ${order})`,
        media,
      }
    },
  },
})
