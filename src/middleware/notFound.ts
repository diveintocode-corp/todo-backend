import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    statusCode: number;
}

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error = {
        name: 'NotFoundError',
        message: `Not found - ${req.originalUrl}`,
        statusCode: 404,
    } as CustomError;
    next(error);
};
