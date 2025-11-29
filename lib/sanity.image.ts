import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './sanity.client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper for responsive images
export function getImageProps(
  source: SanityImageSource,
  width?: number,
  height?: number
) {
  let imageBuilder = urlFor(source).auto('format').fit('max')

  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)

  return {
    src: imageBuilder.url(),
    blurDataURL: urlFor(source).width(20).blur(50).url(),
  }
}
