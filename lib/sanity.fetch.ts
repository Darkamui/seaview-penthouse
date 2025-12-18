import { client } from './sanity.client'
import {
  galleryImagesQuery,
  galleryImagesByCategoryQuery,
  eventTypeImagesQuery,
  eventTypeImagesByTypeQuery,
  featureImagesQuery,
  featureImagesByFeatureQuery,
} from './sanity.queries'
import type { GalleryImage, EventTypeImage, FeatureImage } from './sanity.types'

// Gallery Images
export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  try {
    const result = await client.fetch(galleryImagesQuery, {}, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    return result || []
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return []
  }
}

export async function getGalleryImagesByCategory(
  category: string
): Promise<GalleryImage[]> {
  try {
    const result = await client.fetch(galleryImagesByCategoryQuery, { category }, {
      next: { revalidate: 60 },
    })
    return result || []
  } catch (error) {
    console.error(`Error fetching gallery images for category ${category}:`, error)
    return []
  }
}

// Event Type Images
export async function getAllEventTypeImages(): Promise<EventTypeImage[]> {
  try {
    const result = await client.fetch(eventTypeImagesQuery, {}, {
      next: { revalidate: 60 },
    })
    return result || []
  } catch (error) {
    console.error('Error fetching event type images:', error)
    return []
  }
}

export async function getEventTypeImagesByType(
  eventType: string
): Promise<EventTypeImage[]> {
  try {
    const result = await client.fetch(eventTypeImagesByTypeQuery, { eventType }, {
      next: { revalidate: 60 },
    })
    return result || []
  } catch (error) {
    console.error(`Error fetching event type images for ${eventType}:`, error)
    return []
  }
}

// Feature Images
export async function getAllFeatureImages(): Promise<FeatureImage[]> {
  try {
    const result = await client.fetch(featureImagesQuery, {}, {
      next: { revalidate: 60 },
    })
    return result || []
  } catch (error) {
    console.error('Error fetching feature images:', error)
    return []
  }
}

export async function getFeatureImagesByFeature(
  feature: string
): Promise<FeatureImage[]> {
  try {
    const result = await client.fetch(featureImagesByFeatureQuery, { feature }, {
      next: { revalidate: 60 },
    })
    return result || []
  } catch (error) {
    console.error(`Error fetching feature images for ${feature}:`, error)
    return []
  }
}

// Helper to group images by category
export function groupImagesByCategory(images: GalleryImage[]) {
  return images.reduce((acc, image) => {
    if (!acc[image.category]) {
      acc[image.category] = []
    }
    acc[image.category].push(image)
    return acc
  }, {} as Record<string, GalleryImage[]>)
}

// Helper to group images by event type
export function groupImagesByEventType(images: EventTypeImage[]) {
  return images.reduce((acc, image) => {
    if (!acc[image.eventType]) {
      acc[image.eventType] = []
    }
    acc[image.eventType].push(image)
    return acc
  }, {} as Record<string, EventTypeImage[]>)
}

// Helper to group images by feature
export function groupImagesByFeature(images: FeatureImage[]) {
  return images.reduce((acc, image) => {
    if (!acc[image.feature]) {
      acc[image.feature] = []
    }
    acc[image.feature].push(image)
    return acc
  }, {} as Record<string, FeatureImage[]>)
}
