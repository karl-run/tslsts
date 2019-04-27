export const BASE_URL = 'https://hotell.difi.no/api/json/vegvesen'

export const TESLA_VARIANTS = ['65', '4360']

export interface IndividualCar {
  // Vehicle Identification Number (VIN). Unikt for hvert enkelt kjøretøy
  understellsnr: string
  // Registreringsår
  reg_aar: string
  // Dato for førstgangsregistrering i Norge
  reg_forsteg_norge: string
  // Vognkortet er av ny type hvis > 20040601
  siste_reg_dato: string
  // Kun utfyllt dersom kjøretøyet er vraket
  vrakpant_utbetalt: string
  // 1 - dersom bruktimportert
  bruktimportert: string
  // Dato for neste periodiske kjøretøykontroll
  neste_pkk: string
  // Dato for siste godkjente periodiske kjøretøykontroll
  sist_pkk_godkjent: string
  // Se https://hotell.difi.no/?dataset=vegvesen/fargekode
  farge: string
  // Dato for avregistrering av kjøretøyet
  avreg_dato: string
  // MMDD for førstgangsregistrering i Norge
  reg1g: string
}

export interface PaginatedResult<T> {
  page: number
  pages: number
  posts: number
  entries: T[]
}
