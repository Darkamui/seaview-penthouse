import { groq } from 'next-sanity'

// Gallery Images
export const galleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(category asc, order asc) {
    _id,
    image,
    category,
    alt,
    order,
    publishedAt,
    featured
  }
`

export const galleryImagesByCategoryQuery = groq`
  *[_type == "galleryImage" && category == $category] | order(order asc) {
    _id,
    image,
    category,
    alt,
    order,
    publishedAt,
    featured
  }
`

// Event Type Images
export const eventTypeImagesQuery = groq`
  *[_type == "eventTypeImage"] | order(eventType asc, order asc) {
    _id,
    image,
    eventType,
    alt,
    order
  }
`

export const eventTypeImagesByTypeQuery = groq`
  *[_type == "eventTypeImage" && eventType == $eventType] | order(order asc) {
    _id,
    image,
    eventType,
    alt,
    order
  }
`

// Gallery Videos
export const galleryVideosQuery = groq`
  *[_type == "galleryVideo"] | order(order asc) {
    _id,
    "videoUrl": video.asset->url,
    thumbnail,
    title,
    description,
    order,
    publishedAt
  }
`

// Feature Images
export const featureImagesQuery = groq`
  *[_type == "featureImage"] | order(feature asc, order asc) {
    _id,
    image,
    feature,
    alt,
    order
  }
`

export const featureImagesByFeatureQuery = groq`
  *[_type == "featureImage" && feature == $feature] | order(order asc) {
    _id,
    image,
    feature,
    alt,
    order
  }
`
