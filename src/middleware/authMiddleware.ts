import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required. Please provide a valid token.',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid or expired token.',
        });
    }
};

export const requireOwnership = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const resourceId = req.params.id;

    if (!userId) {
        return res.status(401).json({
            status: 'error',
            message: 'Authentication required.',
        });
    }

    if (userId !== resourceId) {
        return res.status(403).json({
            status: 'error',
            message: 'You do not have permission to access this resource.',
        });
    }

    next();
};
