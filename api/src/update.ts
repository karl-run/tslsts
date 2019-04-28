import fetch from 'node-fetch'
import { createServer, IncomingMessage, ServerResponse } from 'http'

import logger from './utils/logging'
import { getAllCarsByTypeApprovedNumbers } from './external/cars'
import { getAllTypeApproved } from './external/typeapproved'
import { TypeApproved } from './external/api/typeapproved'
import * as db from './data'
import { json } from './utils/request'
import { timer } from './utils/perf'

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const allTypeApproved: TypeApproved[] = await getAllTypeApproved()
  const typeApprovedNumbers: string[] = allTypeApproved
    .map(typeApproved => typeApproved.typegodkjenningsnr)

  try {
    const allCars = await getAllCarsByTypeApprovedNumbers(typeApprovedNumbers)

    const measure = timer('Car insertions')
    await db.newCars(allCars)
    measure.done()

    json(res, { message: `Inserted ${allCars.length} cars` })
  } catch (e) {
    logger.error(e.message)
    json(res, { message: 'Something went wrong' }, 500)
  }
}

if (!process.env.IS_NOW) {
  createServer(handler).listen(3000)

  logger.info('Server listening on 3000')

  fetch('http://localhost:3000').then(async r => {
    logger.info(`Response code: ${r.status}`)
    const result = await r.json()
    logger.info(result)
  })
}

export default handler
