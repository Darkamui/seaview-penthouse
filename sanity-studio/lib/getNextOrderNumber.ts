import type { SanityClient } from 'sanity'

/**
 * Get the next order number for a category/type
 * Auto-increments by 10 (10, 20, 30...)
 */
export async function getNextOrderNumber(
  client: SanityClient,
  documentType: string,
  filterField: string,
  filterValue: string
): Promise<number> {
  const query = `*[_type == $docType && ${filterField} == $filterValue] | order(order desc) [0].order`

  const maxOrder = await client.fetch<number | null>(query, {
    docType: documentType,
    filterValue: filterValue,
  })

  // If no documents exist, start at 10; otherwise increment by 10
  return maxOrder ? maxOrder + 10 : 10
}
