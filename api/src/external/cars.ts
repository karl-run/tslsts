import { flatMap } from '../utils/array'

import PaginatedResultFetcher from '../utils/PaginatedResultFetcher'

import { CARS_URL, CarsResult, CarType } from './api/undercarriage'

const createFetcherByTypeApprovedNumbers = (typeApprovedNumbers: string[]): Promise<CarType[]>[] =>
  typeApprovedNumbers.map(typeNumber =>
    new PaginatedResultFetcher<CarType, CarsResult>(
      `${CARS_URL}?typegodkjenningsnr=${typeNumber}`,
      `Cars(typeNumber=${typeNumber})`,
    ).fetchAllPages(),
  )

export const getAllCarsByTypeApprovedNumbers = async (typeApprovedNumbers: string[]) => {
  const variantPromises: Promise<CarType[]>[] = createFetcherByTypeApprovedNumbers(typeApprovedNumbers)
  const allTypes: CarType[][] = await Promise.all(variantPromises)

  return flatMap(allTypes, types => types)
}
