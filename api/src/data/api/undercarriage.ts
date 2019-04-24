import { PaginatedResult } from './general'

export const UNDERCARRIAGE_URL = 'https://hotell.difi.no/api/json/vegvesen/utek'

export type UndercarriageType = {
  test: string
}

export interface UndercarriageResult extends PaginatedResult {
  entries: UndercarriageType[]
}
