import { flatMap } from '../utils/array'

import PaginatedResultFetcher from '../utils/PaginatedResultFetcher'

import { TESLA_VARIANTS } from './api/general'
import { TECHNICAL_URL, TechnicalResult, TechnicalType } from './api/technical'

const createFetcherForAllVariants = (): Promise<TechnicalType[]>[] =>
  TESLA_VARIANTS.map(variant =>
    new PaginatedResultFetcher<TechnicalType, TechnicalResult>(
      `${TECHNICAL_URL}?merkekode=${variant}`,
      `Techical(${variant})`,
    ).fetchAllPages(),
  )

export const getAllTechnicalForVariants = async (): Promise<TechnicalType[]> => {
  const variantPromises: Promise<TechnicalType[]>[] = createFetcherForAllVariants()
  const allTypes: TechnicalType[][] = await Promise.all(variantPromises)

  return flatMap(allTypes, types => types)
}
