import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

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
