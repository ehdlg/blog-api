import { body, param } from 'express-validator';
import PostModel from '../../models/Post.model';
import { UUID } from 'crypto';
import { userExists } from './user';

const postExists = async (value: UUID) => {
  const post = await PostModel.get({ id: value });

  if (null == post) throw new Error(`Post with id:${id} not found.`);
};

const createPostRules = [
  body('title')
    .exists()
    .withMessage('The post must have a title')
    .isLength({ min: 5, max: 255 })
    .withMessage('The title must be between 5 and 255 characters long'),
  body('content')
    .exists()
    .withMessage('The post must have a content')
    .isLength({ min: 50 })
    .withMessage('Content must have at least 50 characters long.'),
  body('user_id')
    .exists()
    .withMessage('You must provide a user ID')
    .isUUID()
    .withMessage('Invalid User ID')
    .custom(userExists),
];
