import fetch from 'node-fetch'
import { createServer, IncomingMessage, ServerResponse } from 'http'

import { getAllTechnicalForVariants } from './external/technical'
import { getAllCarsByTypeApprovedNumbers } from './external/cars'
import { getAllTypeApproved } from './external/typeapproved'
import { TypeApproved } from './external/api/typeapproved'
import logger from './utils/logging'

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const allTypeApproved: TypeApproved[] = await getAllTypeApproved()
  const typeApprovedNumbers: string[] = allTypeApproved.map(typeApproved => typeApproved.typegodkjenningsnr)

  try {
    const test = await getAllCarsByTypeApprovedNumbers(typeApprovedNumbers)
    res.end(JSON.stringify({ message: `There are ${test.length} cars` }))
  } catch (e) {
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
