import fetch from 'node-fetch'
import { createServer, IncomingMessage, ServerResponse } from 'http'

import logger from './utils/logging'
import { getAllCarsByTypeApprovedNumbers } from './external/cars'
import { getAllTypeApproved } from './external/typeapproved'
import { TypeApproved } from './external/api/typeapproved'
import * as db from './data'

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const allTypeApproved: TypeApproved[] = await getAllTypeApproved()
  const typeApprovedNumbers: string[] = allTypeApproved
    .map(typeApproved => typeApproved.typegodkjenningsnr)
    .slice(0, 10)

  try {
    const test = await getAllCarsByTypeApprovedNumbers(typeApprovedNumbers)

    test.forEach(car => {
      db.newCar(car)
    })

    res.end(JSON.stringify({ message: `There are ${test.length} cars` }))
  } catch (e) {
    logger.error(e.message)
    res.end(JSON.stringify({ message: 'Something went wrong' }))
  }
}

if (!process.env.IS_NOW) {
  createServer(handler).listen(3000)

  logger.info('Server listening on 3000')

  fetch('http://localhost:3000')
    .then(r => r.json())
    .then(result => {
      logger.info(result)
    })
}

export default handler
