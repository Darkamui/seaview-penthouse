/**
 * Migration Script: Sync All Image Categories to Media Tags
 *
 * This script:
 * 1. Creates media.tag documents for each category from all three document types
 * 2. Updates all image assets referenced by galleryImage, eventTypeImage, and featureImage documents
 * 3. Adds the appropriate category tag to each asset's opt.media.tags array
 * 4. Uses naming convention: "Category (Type)" to avoid duplicates
 *
 * Run with: npx sanity exec scripts/syncCategoriesToTags.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli'

// Gallery Image Categories
const GALLERY_CATEGORIES = [
  { value: 'livingRoom', title: 'Living Room (Gallery)', type: 'Gallery' },
  { value: 'balcony', title: 'Balcony (Gallery)', type: 'Gallery' },
  { value: 'bedrooms', title: 'Bedrooms (Gallery)', type: 'Gallery' },
  { value: 'kitchen', title: 'Kitchen (Gallery)', type: 'Gallery' },
  { value: 'bathrooms', title: 'Bathrooms (Gallery)', type: 'Gallery' },
  { value: 'around', title: 'Around (Gallery)', type: 'Gallery' },
  { value: 'events', title: 'Events (Gallery)', type: 'Gallery' },
  { value: 'brides', title: 'Brides (Gallery)', type: 'Gallery' },
]

// Event Type Categories
const EVENT_CATEGORIES = [
  { value: 'intimate', title: 'Intimate Gatherings (Event)', type: 'Event' },
  { value: 'bridal', title: 'Bridal Preparations (Event)', type: 'Event' },
  { value: 'business', title: 'Business Events (Event)', type: 'Event' },
]

// Feature Categories
const FEATURE_CATEGORIES = [
  { value: 'livingSpace', title: 'Living Space (Feature)', type: 'Feature' },
  { value: 'bedroom', title: 'Bedroom (Feature)', type: 'Feature' },
  { value: 'balcony', title: 'Balcony (Feature)', type: 'Feature' },
  { value: 'location', title: 'Location (Feature)', type: 'Feature' },
]

// Combine all categories
const ALL_CATEGORIES = [
  ...GALLERY_CATEGORIES,
  ...EVENT_CATEGORIES,
  ...FEATURE_CATEGORIES,
]

const client = getCliClient()

async function syncCategoriesToTags() {
  console.log('🚀 Starting category to tag sync for all document types...\n')

  // Step 1: Create or update media.tag documents for each category
  console.log('📝 Step 1: Creating/updating media tags...')
  const tagRefs: Record<string, { _type: string; _ref: string; _weak: boolean }> = {}

  for (const category of ALL_CATEGORIES) {
    const tagId = `media-tag-${category.type.toLowerCase()}-${category.value}`

    // Create or update the tag document
    const tag = await client.createOrReplace({
      _id: tagId,
      _type: 'media.tag',
      name: {
        _type: 'slug',
        current: category.title,
      },
    })

    tagRefs[`${category.type}-${category.value}`] = {
      _type: 'reference',
      _ref: tag._id,
      _weak: true,
    }

    console.log(`  ✓ Created/updated tag: ${category.title} (${tagId})`)
  }

  console.log(`\n✅ Created ${ALL_CATEGORIES.length} media tags\n`)

  // Step 2: Fetch all documents from all three types
  console.log('📸 Step 2: Fetching documents...')

  const galleryImages = await client.fetch<Array<{
    _id: string
    category: string
    image: { asset: { _ref: string } }
  }>>(`
    *[_type == "galleryImage" && defined(image.asset._ref)] {
      _id,
      category,
      "image": { "asset": image.asset }
    }
  `)

  const eventTypeImages = await client.fetch<Array<{
    _id: string
    eventType: string
    image: { asset: { _ref: string } }
  }>>(`
    *[_type == "eventTypeImage" && defined(image.asset._ref)] {
      _id,
      eventType,
      "image": { "asset": image.asset }
    }
  `)

  const featureImages = await client.fetch<Array<{
    _id: string
    feature: string
    image: { asset: { _ref: string } }
  }>>(`
    *[_type == "featureImage" && defined(image.asset._ref)] {
      _id,
      feature,
      "image": { "asset": image.asset }
    }
  `)

  console.log(`  Found ${galleryImages.length} gallery images`)
  console.log(`  Found ${eventTypeImages.length} event type images`)
  console.log(`  Found ${featureImages.length} feature images\n`)

  // Step 3: Group images by asset reference with their type-specific categories
  console.log('🔗 Step 3: Grouping images by asset...')
  const assetCategories = new Map<string, Set<string>>()

  // Process gallery images
  for (const img of galleryImages) {
    const assetRef = img.image.asset._ref
    if (!assetCategories.has(assetRef)) {
      assetCategories.set(assetRef, new Set())
    }
    assetCategories.get(assetRef)!.add(`Gallery-${img.category}`)
  }

  // Process event type images
  for (const img of eventTypeImages) {
    const assetRef = img.image.asset._ref
    if (!assetCategories.has(assetRef)) {
      assetCategories.set(assetRef, new Set())
    }
    assetCategories.get(assetRef)!.add(`Event-${img.eventType}`)
  }

  // Process feature images
  for (const img of featureImages) {
    const assetRef = img.image.asset._ref
    if (!assetCategories.has(assetRef)) {
      assetCategories.set(assetRef, new Set())
    }
    assetCategories.get(assetRef)!.add(`Feature-${img.feature}`)
  }

  console.log(`  Found ${assetCategories.size} unique assets\n`)

  // Step 4: Update each asset with appropriate tags
  console.log('🏷️  Step 4: Adding tags to assets...')
  let updatedCount = 0

  for (const [assetRef, categories] of assetCategories.entries()) {
    // Get current asset document
    const asset = await client.getDocument(assetRef)

    if (!asset) {
      console.log(`  ⚠️  Asset ${assetRef} not found, skipping...`)
      continue
    }

    // Build tags array from categories
    const tags = Array.from(categories).map(cat => tagRefs[cat])

    // Update asset with tags
    await client
      .patch(assetRef)
      .set({
        'opt.media.tags': tags,
      })
      .commit()

    updatedCount++
    const categoryNames = Array.from(categories).map(c =>
      ALL_CATEGORIES.find(cat => `${cat.type}-${cat.value}` === c)?.title
    ).join(', ')

    console.log(`  ✓ Tagged asset (${updatedCount}/${assetCategories.size}): ${categoryNames}`)
  }

  console.log(`\n✅ Successfully tagged ${updatedCount} assets!\n`)
  console.log('🎉 Migration complete! You can now filter by category tags in the Media plugin.')
  console.log('\n📌 Available tags:')
  ALL_CATEGORIES.forEach(cat => {
    console.log(`   - ${cat.title}`)
  })
}

// Run the migration
syncCategoriesToTags()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
