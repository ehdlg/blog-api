import { body, validationResult, ValidationChain } from 'express-validator';
import { RequestHandler } from 'express';

export const userValidationRules = (isUpdate: boolean) => {
  const rules: ValidationChain[] = [
    body('username')
      .notEmpty()
      .isLength({ min: 3, max: 15 })
      .withMessage('Username must be between 3 and 15 characters long.'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: !@#$%^&*'
      ),
  ];

  if (isUpdate) {
    rules.forEach((rule) => rule.optional());
  }
  return rules;
};

export const validation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const errorsMessages = errors.array().map((error) => {
    return error.msg;
  });

  return res.status(422).json({ errors: errorsMessages });
};
