import fetch from 'node-fetch'

import { flatMap } from '../utils/array'

import { TECHNICAL_URL, TechnicalResult, TechnicalType, TESLA_VARIANTS } from './api/technical'

const fetchTechicalPage = async (variant: string, page: number): Promise<TechnicalResult> => {
  console.info(`Fetching page ${page}`)

  try {
    const response = await fetch(`${TECHNICAL_URL}?merkekode=${variant}&page=${page}`)
    const result: TechnicalResult = await response.json()

    return result
  } catch (e) {
    console.error('Something went wrong')
    throw e
  }
}

const getAllTypesForType = async (variant: string): Promise<TechnicalType[]> => {
  const initialPage = await fetchTechicalPage(variant, 1)
  const pages = initialPage.pages

  if (pages < 1) {
    console.error(initialPage)
    throw new Error('No type result')
  }

  const remainingPagesPromises: Promise<TechnicalResult>[] = Array(pages - 1)
    .fill({})
    .map((_, index) => fetchTechicalPage(variant, index + 2))

  const remainingResult = await Promise.all(remainingPagesPromises)

  const cummulativeResult: TechnicalType[] = [
    ...initialPage.entries,
    ...flatMap(remainingResult, result => result.entries),
  ]

  return cummulativeResult
}

export const getAllTypes = async (): Promise<TechnicalType[]> => {
  const variantPromises = TESLA_VARIANTS.map(variant => getAllTypesForType(variant))

  const allTypes: TechnicalType[][] = await Promise.all(variantPromises)

  return flatMap(allTypes, types => types)
}
