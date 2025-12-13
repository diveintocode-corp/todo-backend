import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface CustomError extends Error {
    statusCode: number;
    code?: string;
    meta?: any;
}

export const mainErrorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`Error on route ${req.method} ${req.originalUrl}:`, err);

    let statusCode = err.statusCode || 500;
    let message = 'Internal Server Error';

    if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            statusCode = 409;
            const target = err.meta?.target || 'unknown field';
            message = `The record already exists. Duplicate value for field(s): ${Array.isArray(target) ? target.join(',') : target}.`;
        }
        else if (err.code === 'P2025') {
            statusCode = 404;
            message = err.meta?.cause || 'Record not found.';
        }
        else if (err.code === 'P2003') {
            statusCode = 400;
            message = err.meta?.cause || 'Foreign key constraint violation.';
        }
    }
    else {
        message = err.message || message;
    }

    return res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};
