import { Router } from 'express';

const router = Router();

router.get('/');
router.get('/:id');
router.post('/');
router.patch('/:id/status');
router.delete('/:id');

export default router;