import { BASE_URL, PaginatedResult } from './general'

export const CARS_URL = `${BASE_URL}/utek`

export type CarType = {
  reg_aar: string
  reg_forsteg_norge: string
  siste_reg_dato: string
  vrakpant_utbetalt: string
  understellsnr: string
  bruktimportert: string
  neste_pkk: string
  sist_pkk_godkjent: string
  typegodkjenningsnr: string
  farge: string
  avreg_dato: string
  reg1g: string
}

export type CarsResult = PaginatedResult<CarType>
