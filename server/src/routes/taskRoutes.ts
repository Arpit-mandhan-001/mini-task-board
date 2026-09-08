import { Router } from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateStatus } from '../controller/taskController';

const router = Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteTask);

export default router;