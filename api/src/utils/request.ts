import { ServerResponse } from 'http'

export const json = (res: ServerResponse, body: Record<string, any>, statusCode = 200) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(body))
}
