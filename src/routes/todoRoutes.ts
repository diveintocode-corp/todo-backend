import { Router } from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from '../controllers/todoController';
import { validateBody } from '../middleware/validationMiddleware';
import { CreateTodoSchema, UpdateTodoSchema } from '../validation/todoSchema';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// All routes are protected by JWT authentication
router.use(authenticate);

router.post('/', validateBody(CreateTodoSchema), createTodo);
router.get('/', getTodos);
router.get('/:id', getTodoById);
router.put('/:id', validateBody(UpdateTodoSchema), updateTodo);
router.delete('/:id', deleteTodo);

export default router;

