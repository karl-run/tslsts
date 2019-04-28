import { performance } from 'perf_hooks'

import logger from './logging'

export const timer = (tag: string = 'Time ') => {
  logger.info(`${tag} starting measurement...`)

  const stats = {
    start: performance.now(),
    result: -1,
  }

  const done = () => {
    const end = performance.now()
    logger.info(`${tag} took ${Math.round((end - stats.start) * 1000) / 1000}ms`)
    stats.result = end
  }

  return {
    done,
    ...stats,
  }
}
