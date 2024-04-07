import { body, param } from 'express-validator';
import UserModel from '../../models/User.model';
import { type UserID } from '../../models/types';

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;

const usernameExists = async (username: string) => {
  const userInDB = await UserModel.get({ username });

  if (null != userInDB) throw new Error('Username already taken.');
};

export const userExists = async (id: UserID) => {
  try {
    const userInDB = await UserModel.get({ id });

    if (null == userInDB) throw new Error(`User with ID:${id} does not exist.`);
  } catch (e) {
    console.error(e);
  }
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
  //TODO update how patch works, using req.params and not body. Implement auth before
  return [
    param('id').exists().isUUID().withMessage('Invalid User ID'),
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
