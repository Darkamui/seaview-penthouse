/**
 * Tag Image Asset Utility
 *
 * Shared function to tag image assets with media.tag documents
 * Used by both auto-tag action and bulk upload handler
 */

import type { SanityClient } from 'sanity'

export interface TagConfig {
  documentType: 'galleryImage' | 'eventTypeImage' | 'featureImage'
  categoryField: 'category' | 'eventType' | 'feature'
  typeLabel: 'Gallery' | 'Event' | 'Feature'
}

export async function tagImageAsset(
  client: SanityClient,
  assetRef: string,
  categoryValue: string,
  config: TagConfig
): Promise<void> {
  try {
    // Create tag ID based on type and category
    const tagId = `media-tag-${config.typeLabel.toLowerCase()}-${categoryValue}`

    // Get category title based on type
    const categoryTitle = getCategoryTitle(categoryValue, config)

    // Create or update the tag document
    const tag = await client.createOrReplace({
      _id: tagId,
      _type: 'media.tag',
      name: {
        _type: 'slug',
        current: categoryTitle,
      },
    })

    // Get current asset to preserve existing tags
    const asset = await client.getDocument(assetRef)

    if (!asset) {
      console.error(`Asset ${assetRef} not found`)
      return
    }

    // Get existing tags or create empty array
    const existingTags = asset.opt?.media?.tags || []

    // Create tag reference
    const tagRef = {
      _type: 'reference',
      _ref: tag._id,
      _weak: true,
    }

    // Check if this tag already exists
    const tagExists = existingTags.some((t: any) => t._ref === tag._id)

    // Add new tag if it doesn't exist
    const newTags = tagExists ? existingTags : [...existingTags, tagRef]

    // Update asset with tags
    await client
      .patch(assetRef)
      .set({
        'opt.media.tags': newTags,
      })
      .commit()

    console.log(`✓ Tagged asset with: ${categoryTitle}`)
  } catch (error) {
    console.error('Error tagging asset:', error)
  }
}

function getCategoryTitle(value: string, config: TagConfig): string {
  // Map category values to titles with type suffix
  const titleMaps = {
    // Gallery categories
    livingRoom: `Living Room (${config.typeLabel})`,
    balcony: `Balcony (${config.typeLabel})`,
    bedrooms: `Bedrooms (${config.typeLabel})`,
    kitchen: `Kitchen (${config.typeLabel})`,
    bathrooms: `Bathrooms (${config.typeLabel})`,
    around: `Around (${config.typeLabel})`,
    events: `Events (${config.typeLabel})`,
    brides: `Brides (${config.typeLabel})`,

    // Event type categories
    intimate: `Intimate Gatherings (${config.typeLabel})`,
    bridal: `Bridal Preparations (${config.typeLabel})`,
    business: `Business Events (${config.typeLabel})`,

    // Feature categories
    livingSpace: `Living Space (${config.typeLabel})`,
    bedroom: `Bedroom (${config.typeLabel})`,
    location: `Location (${config.typeLabel})`,
  }

  return titleMaps[value as keyof typeof titleMaps] || `${value} (${config.typeLabel})`
}
