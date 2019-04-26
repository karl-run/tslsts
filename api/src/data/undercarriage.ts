import fetch from 'node-fetch'

import { flatMap } from '../utils/array'

import { UNDERCARRIAGE_URL, UndercarriageResult, UndercarriageType } from './api/undercarriage'

const fetchCarriagePage = async (typeNumber: string, page: number): Promise<UndercarriageResult> => {
  console.info(`Fetching type number ${typeNumber} page ${page}`)

  try {
    const response = await fetch(`${UNDERCARRIAGE_URL}?typegodkjenningsnr=${typeNumber}&page=${page}`)
    const result: UndercarriageResult = await response.json()

    return result
  } catch (e) {
    console.error('Something went wrong')
    throw e
  }
}

const getAllPagesForCarriage = async (typeNumber: string): Promise<UndercarriageType[]> => {
  const initialPage = await fetchCarriagePage(typeNumber, 1)
  const pages = initialPage.pages

  if (pages < 1) {
    return []
  }

  const remainingPagesPromises: Promise<UndercarriageResult>[] = Array(pages - 1)
    .fill({})
    .map((_, index) => fetchCarriagePage(typeNumber, index + 2))

  const remainingResult = await Promise.all(remainingPagesPromises)

  const cummulativeResult: UndercarriageType[] = [
    ...initialPage.entries,
    ...flatMap(remainingResult, result => result.entries),
  ]

  return cummulativeResult
}

export const getAllByUndercarriage = async (undercarriages: string[]) => {
  const variantPromises = undercarriages.map(carriage => getAllPagesForCarriage(carriage))

  const allTypes: UndercarriageType[][] = await Promise.all(variantPromises)

  return flatMap(allTypes, types => types)
}
