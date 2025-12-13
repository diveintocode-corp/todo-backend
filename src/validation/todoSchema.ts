import Joi from 'joi';

export const CreateTodoSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(255)
        .trim()
        .required()
        .messages({
            'string.base': 'Title must be a type of text',
            'string.min': 'Title cannot be empty',
            'string.max': 'Title should have a maximum length of {#limit}',
            'any.required': 'Title is required',
        }),

    content: Joi.string()
        .max(5000)
        .trim()
        .allow('')
        .optional()
        .messages({
            'string.base': 'Content must be a type of text',
            'string.max': 'Content should have a maximum length of {#limit}',
        }),

    completed: Joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'Completed must be a boolean value',
        }),
});

export const UpdateTodoSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(255)
        .trim()
        .optional()
        .messages({
            'string.base': 'Title must be a type of text',
            'string.min': 'Title cannot be empty',
            'string.max': 'Title should have a maximum length of {#limit}',
        }),

    content: Joi.string()
        .max(5000)
        .trim()
        .allow('')
        .optional()
        .messages({
            'string.base': 'Content must be a type of text',
            'string.max': 'Content should have a maximum length of {#limit}',
        }),

    completed: Joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'Completed must be a boolean value',
        }),
}).min(1);

