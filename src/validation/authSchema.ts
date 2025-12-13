import Joi from 'joi';

export const LoginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'co'] } })
        .trim()
        .required()
        .messages({
            'string.email': 'Email must be a valid email format (e.g., example@domain.com)',
            'any.required': 'Email is required',
        }),

    password: Joi.string()
        .required()
        .messages({
            'any.required': 'Password is required',
        }),
});
