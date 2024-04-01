import { RequestHandler, Router } from 'express';
import UserModel from '../models/User.model';
import { errorHandler, generateHashedPassword } from '../middlewares';
import { createUserRules, updateUserRules, validation } from '../middlewares/validation';
import { User } from '../db';
import UserController from '../controllers/User.controller';

const router = Router();

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to the Blog API' });
});

router.get('/user', UserController.get);

router.post('/user', createUserRules, validation, generateHashedPassword, UserController.create);

router.delete('/user', UserController.delete);

router.patch('/user', updateUserRules, validation, UserController.update);

router.use(errorHandler);

export default router;
