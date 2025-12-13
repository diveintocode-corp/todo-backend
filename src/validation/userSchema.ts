import Joi from 'joi';

const BaseUserSchema = {
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .messages({
            'string.base': `Username must be a type of 'text'`,
            'string.min': `Username should have a minimum length of {#limit}`,
            'string.max': `Username should have a maximum length of {#limit}`,
        }),

    email: Joi.string()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'org', 'co']}})
        .trim()
        .messages({
            'string.email': `Email must be a valid email format (e.g., example@domain.com)`,
        }),

    password: Joi.string()
        .min(8)
        .max(50)
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9]).*$'))
        .messages({
            'string.pattern.base': `Password must contain at least one uppercase letter and one number`,
            'string.min': `Password must be at least {#limit} characters long`,
            'string.max': `Password must be less than {#limit} characters long`,
            'any.required': `Password is a required field`, 
        }),
};

export const RegistrationSchema = Joi.object({
    ...BaseUserSchema,
    username: BaseUserSchema.username!.required(),
    email: BaseUserSchema.email!.required(),
    password: BaseUserSchema.password!.required(),
});

export const UpdateSchema = Joi.object({
    ...BaseUserSchema,
    username: BaseUserSchema.username!.optional(),
    email: BaseUserSchema.email!.optional(),
    password: BaseUserSchema.password!.optional(),
}).min(1);
