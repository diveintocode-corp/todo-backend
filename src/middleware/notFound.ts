import { Request, Response, NextFunction } from 'express';

// Custom interface for errors
interface CustomError extends Error {
    statusCode: number;
}

// Middleware to handle request to undefined routes
export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Create a custom error object with statusCode
    const error = {
        name: 'NotFoundError',
        message: `Not found - ${req.originalUrl}`,
        statusCode: 404,
    } as CustomError;
    next(error);
};