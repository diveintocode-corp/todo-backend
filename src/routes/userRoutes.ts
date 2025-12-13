import {Router} from 'express';
import {registerUser, updateUser, deleteUser} from '../controllers/userController';
import { validateRegistrationBody, validateUpdateBody } from '../middleware/validationMiddleware';
import { authenticate, requireOwnership } from '../middleware/authMiddleware';

const router = Router();

router.post('/', validateRegistrationBody, registerUser);
router.put('/:id', authenticate, requireOwnership, validateUpdateBody, updateUser);
router.delete('/:id', authenticate, requireOwnership, deleteUser);

export default router;
