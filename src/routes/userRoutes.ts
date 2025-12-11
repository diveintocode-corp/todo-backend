import {Router} from 'express';
import {registerUser, updateUser, deleteUser} from '../controllers/userController';

const router = Router();

//POST /users (Create/ Register)
router.post('/', registerUser);
//PUT /users/:id (Update)
router.put('/:id', updateUser);
//DELETE /users/:id (Delete)
router.delete('/:id', deleteUser);

export default router;