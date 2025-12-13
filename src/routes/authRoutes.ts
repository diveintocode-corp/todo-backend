import { Router } from 'express';
import { login } from '../controllers/authController';
import { validateBody } from '../middleware/validationMiddleware';
import { LoginSchema } from '../validation/authSchema';

const router = Router();

router.post('/login', validateBody(LoginSchema), login);

export default router;
