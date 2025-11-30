import type { SanityImageSource } from '@sanity/image-url'

export interface LocalizedString {
  he?: string
  en?: string
  fr?: string
}

export interface GalleryImage {
  _id: string
  _type: 'galleryImage'
  image: SanityImageSource
  category: 'livingRoom' | 'balcony' | 'bedrooms' | 'kitchen' | 'bathrooms' | 'around' | 'events' | 'brides'
  alt: LocalizedString
  order: number
  publishedAt: string
  featured?: boolean
}

export interface EventTypeImage {
  _id: string
  _type: 'eventTypeImage'
  image: SanityImageSource
  eventType: 'intimate' | 'bridal' | 'business'
  alt: LocalizedString
  order: number
}

export interface FeatureImage {
  _id: string
  _type: 'featureImage'
  image: SanityImageSource
  feature: 'livingSpace' | 'bedroom' | 'balcony' | 'location'
  alt: LocalizedString
  order: number
}
