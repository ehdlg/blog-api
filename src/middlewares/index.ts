import { ErrorRequestHandler, RequestHandler } from 'express';
import { ValidationChain, body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.model';

export const generateHashedPassword: RequestHandler = async (req, res, next) => {
  const { password }: { password: string } = req.body;

  if (!password) throw new Error('Password must not be empty');

  try {
    const SALT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT);

    res.locals.hashedPassword = hashedPassword;

    next();
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';

  return res.status(status).json({ error: message });
};
