import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = errors.array().map((error) => ({
    field: error.path,
    message: error.msg
  }));

  res.status(400).json({
    message: 'Validation failed',
    errors: errorMessages
  });
};

export const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors).map((item) => ({
      field: item.path,
      message: item.message
    }));

    return res.status(400).json({
      message: 'Validation failed',
      errors: errorMessages
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      message: 'Invalid value provided',
      error: error.message
    });
  }

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : 'Internal server error';

  res.status(statusCode).json({
    message
  });
};
