import { NextFunction, Request, Response } from 'express';

export interface CustomError extends Error {
  statusCode?: number;
}

// error handler function
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('[Error Middleware]:', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
