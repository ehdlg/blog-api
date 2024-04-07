import { body, param } from 'express-validator';
import PostModel from '../../models/Post.model';
import { UUID } from 'crypto';
import { userExists } from './user';

const TITLE_LENGTH = {
  min: 5,
  max: 255,
};
const CONTENT_LENGTH = {
  min: 50,
};
const CONTENT_LENGHT_MESSAGE = `Content must have at least ${CONTENT_LENGTH.min} characters long.`;
const TITLE_LENGTH_MESSAGE = `The title must be between ${TITLE_LENGTH.min} and ${TITLE_LENGTH.max} characters long`;
const dateTimeRegex =
  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)\.(\d{6})$/;

const postExists = async (id: UUID) => {
  const post = await PostModel.get({ id });

  if (null == post) throw new Error(`Post with id:${id} not found.`);
};

export const getPostRules = [
  param('id').exists().isUUID().withMessage('Invalid Post ID').custom(postExists),
];

export const createPostRules = [
  body('title')
    .exists()
    .withMessage('The post must have a title')
    .isLength(TITLE_LENGTH)
    .withMessage(TITLE_LENGTH_MESSAGE),
  body('content')
    .exists()
    .withMessage('The post must have a content')
    .isLength(CONTENT_LENGTH)
    .withMessage(CONTENT_LENGHT_MESSAGE),
  body('user_id')
    .exists()
    .withMessage('You must provide a user ID')
    .isUUID()
    .withMessage('Invalid User ID')
    .custom(userExists),
];

export const updatePostRules = [
  param('id').exists().isUUID().withMessage('Invalid Post ID').custom(postExists),
  body('content').optional().isLength(CONTENT_LENGTH).withMessage(CONTENT_LENGHT_MESSAGE),
  body('title').optional().isLength(TITLE_LENGTH).withMessage(TITLE_LENGTH_MESSAGE),
  body('likes').optional().isInt({ min: 0 }).withMessage('Likes must be an integer greater than 0'),
  body('views').optional().isInt({ min: 0 }).withMessage('Views must be an integer greater than 0'),
  ,
  body('published_at')
    .optional()
    .matches(dateTimeRegex)
    .withMessage('The date format should be: YYYY-MM-DD HH:MM:SS'),
  body('updated_at')
    .optional()
    .matches(dateTimeRegex)
    .withMessage('The date format should be: YYYY-MM-DD HH:MM:SS'),
  body('image_url').optional(),
];
