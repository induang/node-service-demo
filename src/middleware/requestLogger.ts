import logger from '../loggers';
import { NextFunction, Request, Response } from 'express';
import { mask } from '../utils/functions';

export default function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  logger.http(`[${req.method}]: ${req.originalUrl}`);
  Object.keys(req.query).length !== 0 && logger.http(` ----query: ${JSON.stringify(req.query)}`);
  Object.keys(req.params).length !== 0 && logger.http(` ----params: ${JSON.stringify(req.params)}`);
  Object.keys(req.body).length !== 0 && logger.http(` ----body: ${JSON.stringify(mask(req.body))}`);
  next();
}
