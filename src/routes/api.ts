import { Router } from 'express';
import { errorHandler, generateHashedPassword } from '../middlewares';
import { validation } from '../middlewares/validation';
import { createUserRules, updateUserRules } from '../middlewares/validation/user';
import UserController from '../controllers/User.controller';
import { PostController } from '../controllers/Post.controller';
import { Post } from '../db';
import { createPostRules, getPostRules } from '../middlewares/validation/post';

const router = Router();

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to the Blog API' });
});

router.get('/user', UserController.get);

router.post('/user', createUserRules, validation, generateHashedPassword, UserController.create);

router.delete('/user', UserController.delete);

router.patch('/user/:id', updateUserRules, validation, UserController.update);

router.get('/post', PostController.get);

router.get('/post/:id', PostController.get);

router.post('/post', createPostRules, validation, PostController.create);

router.delete('/post/:id', PostController.delete);

export default router;
