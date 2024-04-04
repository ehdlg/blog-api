import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const validation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const errorsMessages = errors.array().map((error) => {
    return error.msg;
  });

  return res.status(422).json({ errors: errorsMessages });
};
