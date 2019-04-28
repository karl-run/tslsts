import { createServer, IncomingMessage, ServerResponse } from 'http'

import logger from './utils/logging'
import * as db from './data'
import { json } from './utils/request'

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const cars = await db.lastCars()

    logger.info(`Fetched ${cars.length} cars`)

    json(res, {
      count: cars.length,
      cars,
    })
  } catch (e) {
    logger.error(e.message)
    json(res, { message: 'Something went wrong' })
  }
}

if (!process.env.IS_NOW) {
  createServer(handler).listen(3000)

  logger.info('Server listening on 3000')
}

export default handler
