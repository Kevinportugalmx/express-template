import { createLogger, format, transports } from 'winston'
import colors from 'colors'

const myFormat = format.printf(({ level, message, timestamp, ...rest }) => {
  let coloredLevel = colors.white.bgGreen.bold(` ${level.toUpperCase()}  `) //INFO
  switch (level.toUpperCase()) {
    case 'WARN':
      coloredLevel = colors.black.bgYellow.bold(` ${level.toUpperCase()}  `)
      break
    case 'ERROR':
      coloredLevel = colors.white.bgRed.bold(` ${level.toUpperCase()} `)
      break
    case 'DEBUG':
      coloredLevel = colors.white.bgBlue.bold(` ${level.toUpperCase()} `)
      break
    case 'VERBOSE':
      coloredLevel = colors.white.bgMagenta.bold(` ${level.toUpperCase()} `)
      break
  }
  const coloredTimestamp = colors.grey(timestamp)
  const meta = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : ''
  const logMessage =
    typeof message === 'object' && message !== null
      ? JSON.stringify(message)
      : message

  return `${coloredTimestamp} ${coloredLevel} ${logMessage} ${
    meta ? '\n' + meta : ''
  }`
})

const logger = createLogger({
  format: format.combine(format.timestamp(), myFormat),
  transports: [new transports.Console()],
})

export { logger }
