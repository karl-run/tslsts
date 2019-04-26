import fetch from 'node-fetch'

import { flatMap } from '../utils/array'

import { TYPE_APPROVED_URL, TypeApprovedResult, TypeApproved } from './api/typeapproved'
import { TESLA_VARIANTS } from './api/general'

const fetchTypeApprovedPage = async (typeNumber: string, page: number): Promise<TypeApprovedResult> => {
  console.info(`Fetching type number ${typeNumber} page ${page}`)

  try {
    const response = await fetch(`${TYPE_APPROVED_URL}?merkekode=${typeNumber}&page=${page}`)
    const result: TypeApprovedResult = await response.json()

    return result
  } catch (e) {
    console.error('Something went wrong')
    throw e
  }
}

const getAllPagesForTypeApprovedByType = async (typeNumber: string): Promise<TypeApproved[]> => {
  const initialPage = await fetchTypeApprovedPage(typeNumber, 1)
  const pages = initialPage.pages

  if (pages < 1) {
    return []
  }

  const remainingPagesPromises: Promise<TypeApprovedResult>[] = Array(pages - 1)
    .fill({})
    .map((_, index) => fetchTypeApprovedPage(typeNumber, index + 2))

  const remainingResult = await Promise.all(remainingPagesPromises)

  const cummulativeResult: TypeApproved[] = [
    ...initialPage.entries,
    ...flatMap(remainingResult, result => result.entries),
  ]

  return cummulativeResult
}

export const getAllTypeApproved = async () => {
  const variantPromises = TESLA_VARIANTS.map(variant => getAllPagesForTypeApprovedByType(variant))

  const allTypes: TypeApproved[][] = await Promise.all(variantPromises)

  return flatMap(allTypes, types => types)
}
