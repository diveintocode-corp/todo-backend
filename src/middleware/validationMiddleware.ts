import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { RegistrationSchema, UpdateSchema } from '../validation/userSchema';	

// Generic validation function
const validateBody = (schema: Joi.ObjectSchema) => 
    (req: Request, res: Response, next: NextFunction) => {
        // check the request body against the schema
        const { error } = schema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false,
        });

        if (error) {
            const errorMessages = error.details.map(detail => ({
                field: detail.context?.key,
                message: detail.message.replace(/['"]/g, ''),
            }));

            return res.status(400).json({
                status: 'Validation Failed',
                errors: errorMessages,
            });
        }

        // if validation passes, proceed to the next middleware or route handler
        next()
    };

    // Middleware for POST /users (Registration)
    export const validateRegistrationBody = validateBody(RegistrationSchema)	

    // Middleware for PUT /users/:id (Update)
    export const validateUpdateBody = validateBody(UpdateSchema);	