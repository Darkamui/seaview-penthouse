import { createBulkActionsTable } from 'sanity-plugin-bulk-actions-table'
import type { StructureResolver } from 'sanity/structure'
import { ImageIcon, CalendarIcon, SparklesIcon } from '@sanity/icons'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Gallery Images
      createBulkActionsTable({
        type: 'galleryImage',
        S,
        context,
        title: 'Gallery Images',
        icon: ImageIcon,
      }),
      S.divider(),

      // Event Type Images
      createBulkActionsTable({
        type: 'eventTypeImage',
        S,
        context,
        title: 'Event Type Images',
        icon: CalendarIcon,
      }),
      S.divider(),

      // Feature Images
      createBulkActionsTable({
        type: 'featureImage',
        S,
        context,
        title: 'Feature Images',
        icon: SparklesIcon,
      }),
    ])
