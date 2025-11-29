import { createBulkActionsTable } from 'sanity-plugin-bulk-actions-table'
import type { StructureResolver } from 'sanity/structure'
import { ImageIcon, CalendarIcon, SparklesIcon } from '@sanity/icons'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Gallery Images with Bulk Actions
      createBulkActionsTable({
        type: 'galleryImage',
        S,
        context,
        title: 'Gallery Images (Bulk View)',
        icon: ImageIcon,
      }),
      S.divider(),

      // Event Type Images with Bulk Actions
      createBulkActionsTable({
        type: 'eventTypeImage',
        S,
        context,
        title: 'Event Type Images (Bulk View)',
        icon: CalendarIcon,
      }),
      S.divider(),

      // Feature Images with Bulk Actions
      createBulkActionsTable({
        type: 'featureImage',
        S,
        context,
        title: 'Feature Images (Bulk View)',
        icon: SparklesIcon,
      }),
      S.divider(),

      // Standard document lists (for single-item editing)
      S.listItem()
        .title('Gallery Images (List)')
        .icon(ImageIcon)
        .child(
          S.documentTypeList('galleryImage')
            .title('Gallery Images')
        ),

      S.listItem()
        .title('Event Type Images (List)')
        .icon(CalendarIcon)
        .child(
          S.documentTypeList('eventTypeImage')
            .title('Event Type Images')
        ),

      S.listItem()
        .title('Feature Images (List)')
        .icon(SparklesIcon)
        .child(
          S.documentTypeList('featureImage')
            .title('Feature Images')
        ),
    ])
