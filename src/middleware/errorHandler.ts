import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// Custom interface for errors
interface CustomError extends Error {
    statusCode: number;
    code?: string;
    meta?: any;
}

// Main error handling middleware
export const mainErrorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Log the error
    console.error(`Error on route ${req.method} ${req.originalUrl}:`, err);

    let statusCode = err.statusCode || 500;
    let message = 'Internal Server Error';

    //Handle database errors (Prisma errors)
    if (err instanceof PrismaClientKnownRequestError) {
        // P2002: Handle unique constraint violation
        if (err.code === 'P2002') {
            statusCode = 409;
            const target = err.meta?.target || 'unknown field';
            message = `The record already exists. Duplicate value for field(s): ${Array.isArray(target) ? target.join(',') : target}.`;
        }
        // P2025: Record to update/delete was not found
        else if (err.code === 'P2025') {
            statusCode = 404;
            message = err.meta?.cause || 'Record not found.';
        }
        // P2003: Handle foreign key constraint violation
        else if (err.code === 'P2003') {
            statusCode = 400;
            message = err.meta?.cause || 'Foreign key constraint violation.';
        }

    }
    // Fall back for all other errors
    else {
        message = err.message || message;
    }

    // Send the response
    return res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};