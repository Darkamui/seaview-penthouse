import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const GALLERY_CATEGORY_OPTIONS = [
  { title: 'Living Room', value: 'livingRoom' },
  { title: 'Balcony', value: 'balcony' },
  { title: 'Bedrooms', value: 'bedrooms' },
  { title: 'Kitchen', value: 'kitchen' },
  { title: 'Bathrooms', value: 'bathrooms' },
  { title: 'Around', value: 'around' },
  { title: 'Events', value: 'events' },
  { title: 'Brides', value: 'brides' },
]

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Images',
  type: 'document',
  icon: ImageIcon,

  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables focal point selection
        metadata: ['blurhash', 'lqip', 'palette'], // For progressive loading
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: GALLERY_CATEGORY_OPTIONS,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text (for accessibility)',
      type: 'object',
      fields: [
        { name: 'he', type: 'string', title: 'Hebrew' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'fr', type: 'string', title: 'French' },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3...)',
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      description: 'Show this image prominently',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'alt.en',
      subtitle: 'category',
      media: 'image',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: title || 'Untitled',
        subtitle: `${subtitle} (Order: ${order})`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Recent First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
