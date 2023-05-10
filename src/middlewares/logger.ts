import { format, transports, createLogger } from 'winston'
import { consoleFormat } from 'winston-console-format'

export const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        consoleFormat({
          showMeta: true,
          metaStrip: ['timestamp', 'service'],
          inspectOptions: {
            colors: true,
          },
        }),
      ),
    }),
  ],
})
