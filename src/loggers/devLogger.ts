import winston, { createLogger, format } from 'winston';

const devLogger = createLogger({
  level: process.env.LOG_LEVEL,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(info => `[${info.level}] ${info.message} ${info.timestamp}`),
  ),
  transports: [
    new winston.transports.Console()
  ],
  exceptionHandlers: [
    new winston.transports.Console()
  ],
  rejectionHandlers: [
    new winston.transports.Console()
  ],
  exitOnError: false
});


export default devLogger;
