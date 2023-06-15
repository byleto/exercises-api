import { HttpCodes } from '../constants';
import { NextFunction, Request, Response } from 'express';

export const validationMiddleware = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);
    const { error } = result;

    const valid = error === undefined;

    if (valid) {
      return next();
    }
    return res.status(HttpCodes.badRequest).json({
      error: {
        code: HttpCodes.badRequest,
        message: `Invalid request, ${error.message}`,
      },
    });
  };
};
