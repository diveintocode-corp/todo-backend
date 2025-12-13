import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password.',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password.',
            });
        }

        const token = generateToken(user.id);

        return res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token,
        });
    } catch (error) {
        next(error);
    }
};
