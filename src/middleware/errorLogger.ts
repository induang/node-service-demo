import {  NextFunction, Request, Response } from 'express';
import logger from '../loggers';
import { mask } from '../utils/functions';

export default function errorLoggerMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  res.status(500).send(error.message);
  logger.error(`[${req.method}]: ${req.originalUrl}: ${error.message}`);
  Object.keys(req.query).length !== 0 && logger.error(` ----query: ${JSON.stringify(req.query)}`);
  Object.keys(req.params).length !== 0 && logger.error(` ----params: ${JSON.stringify(req.params)}`);
  Object.keys(req.body).length !== 0 && logger.error(` ----body: ${JSON.stringify(mask(req.body))}`);
}
