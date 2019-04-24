import { createServer, IncomingMessage, ServerResponse } from 'http'
import fetch from 'node-fetch'

import { getAllTypes } from './data/technical'
import { getAllByUndercarriage } from './data/undercarriage'

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const types = await getAllTypes()

  const undercarriages = types.map(type => type.understellsnr)

  console.log(undercarriages.length)

  const test = await getAllByUndercarriage(undercarriages)

  console.log(test)

  res.end(JSON.stringify({ message: 'ayy' }))
}

if (!process.env.IS_NOW) {
  createServer(handler).listen(3000)

  console.info('Server listening on 3000')

  fetch('http://localhost:3000')
    .then(r => r.json())
    .then(result => {
      console.log(result)
    })
}

export default handler
