import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemas } from './schemas'
import { structure } from './structure'
import { createBulkUploadAction } from './actions/BulkUploadAction'
import { createAutoTagAction } from './actions/autoTagAction'
import { GALLERY_CATEGORY_OPTIONS } from './schemas/galleryImage'
import { EVENT_TYPE_OPTIONS } from './schemas/eventTypeImage'
import { FEATURE_OPTIONS } from './schemas/featureImage'
import './customStyles.css'

export default defineConfig({
  name: 'seaview-penthouse',
  title: 'Seaview Penthouse CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(), // For testing GROQ queries
    media(), // Media library plugin with grid view and bulk operations
  ],

  schema: {
    types: schemas,
  },

  document: {
    actions: (prev, context) => {
      const { schemaType } = context

      // Add bulk upload and auto-tag actions for gallery images
      if (schemaType === 'galleryImage') {
        const bulkUpload = createBulkUploadAction({
          documentType: 'galleryImage',
          categoryField: 'category',
          categoryOptions: GALLERY_CATEGORY_OPTIONS,
        })

        const autoTag = createAutoTagAction({
          documentType: 'galleryImage',
          categoryField: 'category',
          typeLabel: 'Gallery',
        })

        // Replace default publish with auto-tag publish
        return prev.map((action) => (action.action === 'publish' ? autoTag : action)).concat(bulkUpload)
      }

      // Add bulk upload and auto-tag actions for event type images
      if (schemaType === 'eventTypeImage') {
        const bulkUpload = createBulkUploadAction({
          documentType: 'eventTypeImage',
          categoryField: 'eventType',
          categoryOptions: EVENT_TYPE_OPTIONS,
        })

        const autoTag = createAutoTagAction({
          documentType: 'eventTypeImage',
          categoryField: 'eventType',
          typeLabel: 'Event',
        })

        // Replace default publish with auto-tag publish
        return prev.map((action) => (action.action === 'publish' ? autoTag : action)).concat(bulkUpload)
      }

      // Add bulk upload and auto-tag actions for feature images
      if (schemaType === 'featureImage') {
        const bulkUpload = createBulkUploadAction({
          documentType: 'featureImage',
          categoryField: 'feature',
          categoryOptions: FEATURE_OPTIONS,
        })

        const autoTag = createAutoTagAction({
          documentType: 'featureImage',
          categoryField: 'feature',
          typeLabel: 'Feature',
        })

        // Replace default publish with auto-tag publish
        return prev.map((action) => (action.action === 'publish' ? autoTag : action)).concat(bulkUpload)
      }

      return prev
    },
  },
})
