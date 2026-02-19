import { createBulkActionsTable } from 'sanity-plugin-bulk-actions-table'
import type { StructureResolver } from 'sanity/structure'
import { ImageIcon, CalendarIcon, SparklesIcon, PlayIcon } from '@sanity/icons'

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

      // Gallery Videos
      S.listItem()
        .title('Gallery Videos')
        .icon(PlayIcon)
        .child(
          S.documentTypeList('galleryVideo')
            .title('Gallery Videos')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),
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
