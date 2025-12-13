import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, completed } = req.body;
    const userId = req.user!.id;

    try {
        const newTodo = await prisma.todo.create({
            data: {
                title,
                content,
                completed: completed ?? false,
                userId,
            },
        });

        return res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
};

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    try {
        const todos = await prisma.todo.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};

export const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user!.id;

    try {
        const todo = await prisma.todo.findFirst({
            where: { id, userId },
        });

        if (!todo) {
            return res.status(404).json({
                status: 'error',
                message: 'Todo not found.',
            });
        }

        return res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const { title, content, completed } = req.body;

    try {
        // First check if the todo exists and belongs to the user
        const existingTodo = await prisma.todo.findFirst({
            where: { id, userId },
        });

        if (!existingTodo) {
            return res.status(404).json({
                status: 'error',
                message: 'Todo not found.',
            });
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (completed !== undefined) updateData.completed = completed;

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateData,
        });

        return res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user!.id;

    try {
        // First check if the todo exists and belongs to the user
        const existingTodo = await prisma.todo.findFirst({
            where: { id, userId },
        });

        if (!existingTodo) {
            return res.status(404).json({
                status: 'error',
                message: 'Todo not found.',
            });
        }

        await prisma.todo.delete({
            where: { id },
        });

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};

