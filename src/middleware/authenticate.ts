
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const privateKey = process.env.ENCODE_KEY || '';

export function checkToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.slice(0, 7) === 'Bearer ' ? authorization.slice(7) : authorization;
  if (!token) {
    return res.status(401).send('Unauthenticated, No token.');
  }
  return jwt.verify(token, privateKey, (error, decoded) => {
    if (error) {
      return res.status(403).send({
        result: 'Invalid token.',
        message: error.message
      });
    }
    return next();
  });
}
