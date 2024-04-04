import { Router } from 'express';
import { errorHandler, generateHashedPassword } from '../middlewares';
import { validation } from '../middlewares/validation';
import { createUserRules, updateUserRules } from '../middlewares/validation/user';
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
