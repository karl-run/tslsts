import fetch from 'node-fetch'

import { flatMap } from './array'

import { PaginatedResult } from '../external/api/general'

class PaginatedResultFetcher<R, T extends PaginatedResult<R>> {
  private readonly URL: string
  private readonly id?: string

  constructor(url: string, id?: string) {
    this.URL = url
    this.id = id

    console.info(`Setting up paginated result fetcher${this.makeIdString()}(${url})`)
  }

  private makeIdString(): string {
    return this.id ? ` for ${this.id} ` : ' '
  }

  private async fetchPage(page: number): Promise<T> {
    console.info(`Fetching${this.makeIdString()}page ${page}`)

    try {
      const response = await fetch(`${this.URL}&page=${page}`)
      return await response.json()
    } catch (e) {
      console.error('Something went wrong')
      throw e
    }
  }

  private createRemainingPagesPromises(pages: number): Promise<T>[] {
    const createPromise = ({}, index: number) => this.fetchPage(index + 2)

    return Array(pages - 1)
      .fill({})
      .map(createPromise)
  }

  public async fetchAllPages() {
    const initialPage = await this.fetchPage(1)
    const pages = initialPage.pages

    if (pages < 1) {
      return []
    }

    const remainingPagesPromises: Promise<T>[] = this.createRemainingPagesPromises(pages)
    const remainingResult = await Promise.all(remainingPagesPromises)

    const cumulativeResult: R[] = [...initialPage.entries, ...flatMap(remainingResult, result => result.entries)]

    return cumulativeResult
  }
}

export default PaginatedResultFetcher
