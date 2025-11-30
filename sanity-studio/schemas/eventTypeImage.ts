import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const EVENT_TYPE_OPTIONS = [
  { title: 'Intimate Gatherings', value: 'intimate' },
  { title: 'Bridal Preparations', value: 'bridal' },
  { title: 'Business Events', value: 'business' },
]

export default defineType({
  name: 'eventTypeImage',
  title: 'Event Type Images',
  type: 'document',
  icon: CalendarIcon,

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
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: EVENT_TYPE_OPTIONS,
        layout: 'radio',
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
      title: 'eventType',
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
