import {Request, Response, NextFunction} from 'express';
import prisma from '../prisma'
import bcrypt from 'bcryptjs';

const saltRounds  = 10;

//Exclude the password field from the returned user object
const exclude = (user: any, keys: string[]) => {
    return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
    );
};

/**
 * POST /users - Create (Register) a new user
 */
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const {username,email, password} = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user
        const newUser = await prisma.user.create({
            data: {
                username, 
                email,
                password: hashedPassword
            },
        });

        //Return the user object, excluding the password
        const userWithoutPassword = exclude(newUser, ['password']);
        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};

/**
 * PUT /users/:id - Update an existing user
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {username, email, password} = req.body;
    const updateData: any = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    // Update password if provided and hash it
    if (password) updateData.password = await bcrypt.hash(password, saltRounds);

    try {
        const updatedUser = await prisma.user.update({
            where: {id},
            data: updateData,
        });

        // Return the updated user object, excluding the password
        const userWithoutPassword = exclude(updatedUser, ['password']);
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        // Pass errors to the handler
        next(error);
    }
};

/**
 * DELETE /users/:id - Delete a user
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    try {
        await prisma.user.delete({
            where: {id},
        });

        // 204 No Content is standard for a successful DELETE
        return res.status(204).send();
    } catch (error: any) {
        // Pass errors to the handler
        next(error);
    }
};