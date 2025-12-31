/**
 * Remove Old Gallery Tags
 *
 * Removes the old gallery tags without "(Gallery)" suffix that are now duplicates
 * of the new naming convention tags.
 */

import { getCliClient } from 'sanity/cli'

const OLD_TAG_IDS = [
  'media-tag-livingRoom',
  'media-tag-balcony',
  'media-tag-bedrooms',
  'media-tag-kitchen',
  'media-tag-bathrooms',
  'media-tag-around',
  'media-tag-events',
  'media-tag-brides',
]

const client = getCliClient()

async function removeOldTags() {
  console.log('🗑️  Removing old gallery tags without type suffix...\n')

  let deletedCount = 0

  for (const tagId of OLD_TAG_IDS) {
    try {
      // Check if tag exists
      const tag = await client.getDocument(tagId)

      if (tag) {
        // Delete the tag
        await client.delete(tagId)
        console.log(`  ✓ Deleted: ${tag.name?.current || tagId}`)
        deletedCount++
      } else {
        console.log(`  ⚠️  Tag not found: ${tagId}`)
      }
    } catch (error: any) {
      if (error.statusCode === 404) {
        console.log(`  ⚠️  Tag not found: ${tagId}`)
      } else {
        console.error(`  ❌ Error deleting ${tagId}:`, error.message)
      }
    }
  }

  console.log(`\n✅ Deleted ${deletedCount} old tags`)
  console.log('\n🎉 Cleanup complete! Only the new tags with type suffixes remain.')
}

// Run the cleanup
removeOldTags()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
