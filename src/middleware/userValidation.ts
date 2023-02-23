import { Request, Response, NextFunction } from 'express';
import { createSchema, updateSchema, userValidator } from '../schemas/userValidator';

export const updateUserValidation = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = userValidator(updateSchema)(req.body);
  if (error) {
    console.log(error.message);
    res.status(400).send(`Invaild Request.\n${error.message}`);
  } else {
    return next();
  }
};

export const addUserValidation = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = userValidator(createSchema)(req.body);
  if (error) {
    console.log(error.message);
    res.status(400).send(`Invaild Request.\n${error.message}`);
  } else {
    return next();
  }
};
