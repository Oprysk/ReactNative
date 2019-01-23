const winston = require('winston')

const { combine, timestamp } = winston.format

const errorFormatter = winston.format((info) => {
  if (info.message instanceof Error) {
    return {
      ...info,
      message: info.message.message,
      stack: info.message.stack,
    }
  } else if (info instanceof Error) {
    return {
      ...info,
      message: info.message,
      stack: info.stack,
    }
  }

  return info
})

const logger = winston.createLogger({
  format: combine(errorFormatter(), timestamp(), winston.format.json()),
  transports: [new winston.transports.Console()],
})

module.exports = logger
