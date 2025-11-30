import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './schemas'
import { structure } from './structure'
import { createBulkUploadAction } from './actions/BulkUploadAction'
import { GALLERY_CATEGORY_OPTIONS } from './schemas/galleryImage'
import { EVENT_TYPE_OPTIONS } from './schemas/eventTypeImage'
import { FEATURE_OPTIONS } from './schemas/featureImage'

export default defineConfig({
  name: 'seaview-penthouse',
  title: 'Seaview Penthouse CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(), // For testing GROQ queries
  ],

  schema: {
    types: schemas,
  },

  document: {
    actions: (prev, context) => {
      const { schemaType } = context

      // Add bulk upload action for gallery images
      if (schemaType === 'galleryImage') {
        const bulkUpload = createBulkUploadAction({
          documentType: 'galleryImage',
          categoryField: 'category',
          categoryOptions: GALLERY_CATEGORY_OPTIONS,
        })
        return [...prev, bulkUpload]
      }

      // Add bulk upload action for event type images
      if (schemaType === 'eventTypeImage') {
        const bulkUpload = createBulkUploadAction({
          documentType: 'eventTypeImage',
          categoryField: 'eventType',
          categoryOptions: EVENT_TYPE_OPTIONS,
        })
        return [...prev, bulkUpload]
      }

      // Add bulk upload action for feature images
      if (schemaType === 'featureImage') {
        const bulkUpload = createBulkUploadAction({
          documentType: 'featureImage',
          categoryField: 'feature',
          categoryOptions: FEATURE_OPTIONS,
        })
        return [...prev, bulkUpload]
      }

      return prev
    },
  },
})
