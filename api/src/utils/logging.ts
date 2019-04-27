import { createLogger, format, Logger, transports } from 'winston'

const logFormat = format.printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

const logger: Logger = createLogger({
  level: 'debug',
  format: format.combine(format.timestamp(), format.colorize(), format.label({ label: `🤷‍♂️ tslsts` }), logFormat),
  transports: [new transports.Console()],
})

export default logger
