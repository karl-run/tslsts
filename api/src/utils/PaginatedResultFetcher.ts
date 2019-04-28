import fetch from 'node-fetch'

import { flatMap } from './array'

import { PaginatedResult } from '../external/api/general'

import logger from './logging'
import { wait } from './promise'

class PaginatedResultFetcher<R, T extends PaginatedResult<R>> {
  private readonly URL: string
  private readonly id?: string
  private readonly throttle: number | null

  constructor(url: string, id?: string, throttle: number = 150) {
    this.URL = url
    this.id = id
    this.throttle = throttle

    logger.info(`Setting up paginated result fetcher${this.makeIdString()}(${url})`)
  }

  private makeIdString(): string {
    return this.id ? ` for ${this.id} ` : ' '
  }

  private createDelay(page: number): number {
    if (this.throttle == null) {
      throw new Error('Unable to create delay with no throttling.')
    }

    if (page === 1) {
      return Math.round(Math.random() * 1000)
    } else {
      return this.throttle * (page - 1) + Math.round((Math.random() * this.throttle) / 8)
    }
  }

  private async fetchPage(page: number): Promise<T> {
    logger.info(
      `Fetching${this.makeIdString()}page ${page} (throttled: ${
        this.throttle ? `yes (${this.createDelay(page)})` : 'no'
        })`,
    )

    if (this.throttle) {
      await wait(this.createDelay(page))
    }

    try {
      const response = await fetch(`${this.URL}&page=${page}`)
      return await response.json()
    } catch (e) {
      logger.error('Something went wrong')
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

    logger.info(`There are ${cumulativeResult.length} units${this.makeIdString()}`)

    return cumulativeResult
  }
}

export default PaginatedResultFetcher
