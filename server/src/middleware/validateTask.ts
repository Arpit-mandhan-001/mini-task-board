import { NextFunction, Request, Response } from 'express';

const VALID_STATUSES = ['todo', 'in-progress', 'done'];

// first validate task, if it is valid then perform next() otherwise send error
export const validateCreateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, status } = req.body;

  // title is not string or null return error
  if (!title || typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({
      success: false,
      error: 'Task title is required and cannot be empty',
    });
    return;
  }

//   status is undefined send error
  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    res.status(400).json({
      success: false,
      error: `Invalid task status. Allowed values: ${VALID_STATUSES.join(', ')}`,
    });
    return;
  }

  next();
};

export const validateUpdateStatus = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { status } = req.body;

  if (!status || !VALID_STATUSES.includes(status)) {
    res.status(400).json({
      success: false,
      error: `Invalid task status. Allowed values: ${VALID_STATUSES.join(', ')}`,
    });
    return;
  }

  next();
};
