import {Router} from 'express';
import {registerUser, updateUser, deleteUser} from '../controllers/userController';
import { validateRegistrationBody, validateUpdateBody } from '../middleware/validationMiddleware';

const router = Router();

//POST /users (Create/ Register)
router.post('/', validateRegistrationBody, registerUser);
//PUT /users/:id (Update)
router.put('/:id', validateUpdateBody, updateUser);
//DELETE /users/:id (Delete)
router.delete('/:id', deleteUser);

export default router;