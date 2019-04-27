export const BASE_URL = 'https://hotell.difi.no/api/json/vegvesen'

export const TESLA_VARIANTS = ['65', '4360']

export interface PaginatedResult<T> {
  page: number
  pages: number
  posts: number
  entries: T[]
}
