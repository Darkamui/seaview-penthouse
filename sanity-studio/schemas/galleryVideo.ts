import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export default defineType({
  name: 'galleryVideo',
  title: 'Gallery Videos',
  type: 'document',
  icon: PlayIcon,

  fields: [
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm,video/ogg',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      description: 'Poster/cover image shown before the video plays',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette'],
      },
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'he', type: 'string', title: 'Hebrew' },
        { name: 'en', type: 'string', title: 'English' },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'he', type: 'string', title: 'Hebrew' },
        { name: 'en', type: 'string', title: 'English' },
      ],
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
  ],

  preview: {
    select: {
      title: 'title.en',
      media: 'thumbnail',
      order: 'order',
    },
    prepare({ title, media, order }) {
      return {
        title: title || 'Untitled Video',
        subtitle: `Order: ${order}`,
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
      title: 'Recent First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
