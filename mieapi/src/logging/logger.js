// logging/logger.js
import { createLogger, format, transports } from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
const { combine, timestamp, printf, errors, colorize } = format;

//process.env should hold this value for future 
const sourceToken = 'LhCY5EnVsPfeJHHqMyA7wev5'
const logtail = new Logtail(sourceToken);


const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A', 
      })
      ,
    errors({ stack: true }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new LogtailTransport(logtail)
    //new transports.File({ filename: 'combined.log' })
  ],
});

export default logger;
