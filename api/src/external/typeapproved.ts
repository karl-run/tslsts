import { flatMap } from '../utils/array'

import PaginatedResultFetcher from '../utils/PaginatedResultFetcher'

import { TESLA_VARIANTS } from './api/general'
import { TYPE_APPROVED_URL, TypeApprovedResult, TypeApproved } from './api/typeapproved'

const createFetcherForAllVariants = (): Promise<TypeApproved[]>[] =>
  TESLA_VARIANTS.map(variant =>
    new PaginatedResultFetcher<TypeApproved, TypeApprovedResult>(
      `${TYPE_APPROVED_URL}?merkekode=${TESLA_VARIANTS[0]}`,
      `TypeApproved(${variant})`,
    ).fetchAllPages(),
  )

export const getAllTypeApproved = async () => {
  const variantPromises: Promise<TypeApproved[]>[] = createFetcherForAllVariants()
  const allTypes: TypeApproved[][] = await Promise.all(variantPromises)

  return flatMap(allTypes, types => types)
}
