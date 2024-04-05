import { body, param } from 'express-validator';
import PostModel from '../../models/Post.model';
import { UUID } from 'crypto';
import { userExists } from './user';

const TITLE_LENGTH = {
  min: 5, 
  max: 255
}

const CONTENT_LENGTH = {
  min: 50
}

const postExists = async (id: UUID) => {
  const post = await PostModel.get({ id });

  if (null == post) throw new Error(`Post with id:${id} not found.`);
};

const createPostRules = [
  body('title')
    .exists()
    .withMessage('The post must have a title')
    .isLength(TITLE_LENGTH)
    .withMessage('The title must be between 5 and 255 characters long'),
  body('content')
    .exists()
    .withMessage('The post must have a content')
    .isLength(CONTENT_LENGTH)
    .withMessage(`Content must have at least ${CONTENT_LENGTH.min} characters long.`),
  body('user_id')
    .exists()
    .withMessage('You must provide a user ID')
    .isUUID()
    .withMessage('Invalid User ID')
    .custom(userExists),
];

updatePostRules = [param('id').exists().isUUID().withMessage('Invalid Post ID').custom(postExists),
  body('title').
];

const updatePostRules = [param('id')];
