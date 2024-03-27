import { RequestHandler } from 'express';
import sequelize from '../db';

export const authenticateDBConnection: RequestHandler = async (_, res, next) => {
  try {
    await sequelize.authenticate();
    console.log('Connection to db succesful');
    next();
  } catch (e) {
    return res.status(500).json(e);
  }
};
