import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcrypt';

export const generateHashedPassword: RequestHandler = async (req, res, next) => {
  const { password }: { password: string } = req.body;

  try {
    const SALT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT);

    res.locals.hashedPassword = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
};

export const notFoundHandler: RequestHandler = async (_, __, next) => {
  const error = {
    status: 404,
    message: 'Not found!',
  };

  next(error);
};

export const errorHandler: ErrorRequestHandler = (
  error: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  const status = error.status || 500;

  const message = error.message || 'Something went wrong.';

  return res.status(status).json({ error: message });
};
