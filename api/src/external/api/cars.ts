import { BASE_URL, IndividualCar, PaginatedResult } from './general'

export const CARS_URL = `${BASE_URL}/utek`

export interface CarType extends IndividualCar {
  // Består av: Godkjenningsnummer (1-4), variant (5-7) og år (8-11)
  typegodkjenningsnr: string
}

export type CarsResult = PaginatedResult<CarType>
