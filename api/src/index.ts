import { createServer, IncomingMessage, ServerResponse } from 'http'
import fetch from 'node-fetch'

import { getAllTypes } from './data/technical'
import { getAllByUndercarriage } from './data/undercarriage'
import { getAllTypeApproved } from './data/typeapproved'
import { TypeApproved } from './data/api/typeapproved'

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  //const types = await getAllTypes()
  //const undercarriages = types.map(type => type.understellsnr)

  const allTypeApproved: TypeApproved[] = await getAllTypeApproved()
  const typeApprovedNumbers: string[] = allTypeApproved
    .map(typeApproved => typeApproved.typegodkjenningsnr)
    .slice(0, 20)

  console.log(typeApprovedNumbers.length)

  const test = await getAllByUndercarriage(typeApprovedNumbers)

  console.log(test.length)

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
