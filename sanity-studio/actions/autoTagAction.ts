/**
 * Auto-Tag Action: Automatically tag image assets on document publish
 *
 * This action wraps the default publish action and automatically tags
 * the image asset with the appropriate media.tag based on the document's
 * category/eventType/feature field.
 *
 * This ensures external users don't need to run terminal commands -
 * images are automatically tagged when documents are published.
 */

import { DocumentActionComponent, useDocumentOperation } from 'sanity'
import { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import { tagImageAsset } from '../lib/tagImageAsset'

interface AutoTagConfig {
  documentType: 'galleryImage' | 'eventTypeImage' | 'featureImage'
  categoryField: 'category' | 'eventType' | 'feature'
  typeLabel: 'Gallery' | 'Event' | 'Feature'
}

export function createAutoTagAction(config: AutoTagConfig): DocumentActionComponent {
  return function AutoTagAction(props) {
    const { id, type, draft, published } = props
    const { patch, publish } = useDocumentOperation(id, type)
    const client = useClient({ apiVersion: '2024-01-01' })
    const [isPublishing, setIsPublishing] = useState(false)

    useEffect(() => {
      // If the action is publishing, we want to tag the asset
      if (isPublishing) {
        return
      }
    }, [isPublishing])

    return {
      disabled: publish.disabled,
      label: isPublishing ? 'Publishing & Tagging...' : 'Publish',
      onHandle: async () => {
        setIsPublishing(true)

        try {
          // Get the document (draft or published)
          const doc = draft || published

          if (!doc) {
            console.error('No document found')
            publish.execute()
            setIsPublishing(false)
            return
          }

          // Get category value and image asset reference
          const categoryValue = doc[config.categoryField]
          const assetRef = doc.image?.asset?._ref

          if (!categoryValue || !assetRef) {
            console.log('No category or asset found, skipping tagging')
            publish.execute()
            setIsPublishing(false)
            return
          }

          // First publish the document
          publish.execute()

          // Then tag the asset using shared utility
          await tagImageAsset(client, assetRef, categoryValue, config)

          setIsPublishing(false)
        } catch (error) {
          console.error('Error during publish and tag:', error)
          setIsPublishing(false)
        }
      },
    }
  }
}
