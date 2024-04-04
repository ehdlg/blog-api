import { body } from 'express-validator';
import UserModel from '../../models/User.model';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;

const usernameExists = async (value: string) => {
  const userInDB = await UserModel.get({ username: value });

  if (null != userInDB) throw new Error('Username already taken.');
};

export const createUserRules = (() => {
  return [
    body('username')
      .exists()
      .withMessage('Username required')
      .isLength({ min: 3, max: 15 })
      .withMessage('Username must be between 3 and 15 characters long.')
      .custom(usernameExists),

    body('password')
      .exists()
      .withMessage('Password required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.')
      .matches(PASSWORD_REGEX)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: !@#$%^&*'
      ),
  ];
})();

export const updateUserRules = (() => {
  return [
    body('username').optional(),
    body('updatedUser').exists().withMessage('You must send the updated fields'),
    body('updatedUser.username')
      .optional()
      .isLength({ min: 3, max: 15 })
      .withMessage('Username must be between 3 and 15 characters long.'),
    body('updatedUser.password')
      .optional()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.')
      .matches(PASSWORD_REGEX)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: !@#$%^&*'
      )
      .custom(usernameExists),
  ];
})();
