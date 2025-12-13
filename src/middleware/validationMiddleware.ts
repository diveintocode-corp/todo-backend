import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { RegistrationSchema, UpdateSchema } from '../validation/userSchema';	

export const validateBody = (schema: Joi.ObjectSchema) => 
    (req: Request, res: Response, next: NextFunction) => {
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

        next()
    };

export const validateRegistrationBody = validateBody(RegistrationSchema)	
export const validateUpdateBody = validateBody(UpdateSchema);
