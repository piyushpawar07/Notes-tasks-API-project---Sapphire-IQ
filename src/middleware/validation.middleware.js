import { body, param } from 'express-validator';

export const noteBodyValidation = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('content')
    .isString()
    .withMessage('Content must be a string')
    .bail()
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('isPinned')
    .optional()
    .isBoolean({ strict: true })
    .withMessage('isPinned must be a boolean')
];

export const noteIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid note ID')
];
