import Joi from 'joi';

export const userValidator = (schema: Joi.ObjectSchema) => (payload: Request) =>
  schema.validate(payload, { abortEarly: false });

const containsAlphaAndNumRegex = /^(?![^a-zA-Z]+$)(?!\D+$)/;

export const createSchema = Joi.object({
  login: Joi.string().required(),
  age: Joi.number().integer().less(131).greater(3).required(),
  password: Joi.string().pattern(containsAlphaAndNumRegex).required()
});

export const updateSchema = Joi.object({
  login: Joi.string().required(),
  age: Joi.number().integer().less(131).greater(3).required(),
  password: Joi.string().pattern(containsAlphaAndNumRegex).required()
});
