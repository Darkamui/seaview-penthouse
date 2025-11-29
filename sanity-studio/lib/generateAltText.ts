/**
 * Generate alt text from filename
 * Examples:
 *   "living-room-sunset.jpg" → "Living Room Sunset"
 *   "balcony_view_01.png" → "Balcony View 01"
 *   "IMG_1234.jpg" → "Image 1234"
 */
export function generateAltTextFromFilename(filename: string): string {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')

  // Replace underscores and hyphens with spaces
  let cleanName = nameWithoutExt.replace(/[_-]/g, ' ')

  // Capitalize first letter of each word
  cleanName = cleanName
    .split(' ')
    .map(word => {
      if (word.length === 0) return word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')

  // Handle common patterns
  if (cleanName.toLowerCase().startsWith('img ')) {
    cleanName = 'Image ' + cleanName.slice(4)
  }

  return cleanName
}
