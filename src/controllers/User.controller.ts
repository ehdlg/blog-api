import { RequestHandler } from 'express';
import UserModel from '../models/User.model';

export default class UserController {
  static get: RequestHandler = async (req, res, next) => {
    try {
      const { username } = req.body;

      const result = (await UserModel.get({ username })) || [];

      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  static create: RequestHandler = async (req, res, next) => {
    const { username }: { username: string } = req.body;
    const password = res.locals.hashedPassword;

    try {
      const newUser = await UserModel.create({ username, password });
      return res.json(newUser);
    } catch (error) {
      next(error);
    }
  };

  static delete: RequestHandler = async (req, res, next) => {
    const { username }: { username: string } = req.body;
    try {
      const deletedUser = await UserModel.delete({ username });

      return res.json({ deletedUser });
    } catch (error) {
      next(error);
    }
  };

  static update: RequestHandler = async (req, res, next) => {
    const { username, password, updatedUser } = req.body;

    res.json({ username, password, updatedUser });
  };
}
