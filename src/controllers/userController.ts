import {Request, Response, NextFunction} from 'express';
import prisma from '../prisma'
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

const saltRounds  = 10;

const exclude = (user: any, keys: string[]) => {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    );
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const {username,email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                username, 
                email,
                password: hashedPassword
            },
        });

        const token = generateToken(newUser.id);

        const userWithoutPassword = exclude(newUser, ['password']);
        return res.status(201).json({ ...userWithoutPassword, token });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {username, email, password} = req.body;
    const updateData: any = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, saltRounds);

    try {
        const updatedUser = await prisma.user.update({
            where: {id},
            data: updateData,
        });

        const userWithoutPassword = exclude(updatedUser, ['password']);
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    try {
        await prisma.user.delete({
            where: {id},
        });

        return res.status(204).send();
    } catch (error: any) {
        next(error);
    }
};
