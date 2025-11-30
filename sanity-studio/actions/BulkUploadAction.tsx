import type { DocumentActionComponent } from 'sanity'
import { UploadIcon } from '@sanity/icons'
import { useState } from 'react'
import { BulkUploadDialog } from '../components/BulkUploadDialog'

interface BulkUploadActionProps {
  documentType: 'galleryImage' | 'eventTypeImage' | 'featureImage'
  categoryField: string
  categoryOptions: Array<{ title: string; value: string }>
}

export function createBulkUploadAction({
  documentType,
  categoryField,
  categoryOptions,
}: BulkUploadActionProps): DocumentActionComponent {
  const BulkUploadAction: DocumentActionComponent = () => {
    const [dialogOpen, setDialogOpen] = useState(false)

    return {
      label: 'Bulk Upload',
      icon: UploadIcon,
      tone: 'primary',
      onHandle: () => {
        setDialogOpen(true)
      },
      dialog: dialogOpen
        ? {
            type: 'dialog',
            onClose: () => setDialogOpen(false),
            content: (
              <BulkUploadDialog
                documentType={documentType}
                categoryField={categoryField}
                categoryOptions={categoryOptions}
                onClose={() => setDialogOpen(false)}
              />
            ),
          }
        : undefined,
    }
  }

  return BulkUploadAction
}
