import { BASE_URL, PaginatedResult } from './general'

export const CARS_URL = `${BASE_URL}/utek`

export type CarType = {
  test: string
}

export type CarsResult = PaginatedResult<CarType>
