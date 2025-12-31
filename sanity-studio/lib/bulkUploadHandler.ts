import type { SanityClient } from 'sanity'
import { generateAltTextFromFilename } from './generateAltText'
import { getNextOrderNumber } from './getNextOrderNumber'
import { tagImageAsset } from './tagImageAsset'

export interface BulkUploadOptions {
  client: SanityClient
  files: File[]
  documentType: 'galleryImage' | 'eventTypeImage' | 'featureImage'
  categoryField: string // 'category' | 'eventType' | 'feature'
  categoryValue: string
  locale?: string
  onProgress?: (current: number, total: number) => void
}

export interface BulkUploadResult {
  success: number
  errors: string[]
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function bulkUploadImages({
  client,
  files,
  documentType,
  categoryField,
  categoryValue,
  locale = 'en',
  onProgress,
}: BulkUploadOptions): Promise<BulkUploadResult> {
  const errors: string[] = []
  let success = 0

  // Get starting order number
  let currentOrder = await getNextOrderNumber(
    client,
    documentType,
    categoryField,
    categoryValue
  )

  // Process files sequentially to maintain order
  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    try {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File too large (max 10MB)`)
        continue
      }

      // Upload image asset
      const asset = await client.assets.upload('image', file, {
        filename: file.name,
      })

      // Generate alt text from filename
      const generatedAlt = generateAltTextFromFilename(file.name)

      // Create document
      await client.create({
        _type: documentType,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
        [categoryField]: categoryValue,
        alt: {
          [locale]: generatedAlt,
          // Duplicate for other locales (user can edit later)
          he: generatedAlt,
          en: generatedAlt,
          fr: generatedAlt,
        },
        order: currentOrder,
        publishedAt: new Date().toISOString(),
        ...(documentType === 'galleryImage' && { featured: false }),
      })

      // Tag the asset immediately after creating the document
      const typeLabel = documentType === 'galleryImage' ? 'Gallery' :
                        documentType === 'eventTypeImage' ? 'Event' : 'Feature'

      await tagImageAsset(client, asset._id, categoryValue, {
        documentType,
        categoryField,
        typeLabel,
      })

      success++
      currentOrder += 10 // Increment by 10

      // Update progress
      if (onProgress) {
        onProgress(i + 1, files.length)
      }

      // Small delay to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 40))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      errors.push(`${file.name}: ${errorMessage}`)
    }
  }

  return { success, errors }
}
