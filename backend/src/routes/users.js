import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(protect);

router.get('/',      authorize('Admin'), getUsers);
router.get('/:id',   getUserById);
router.put('/:id',   updateUser);
router.delete('/:id', authorize('Admin'), deleteUser);

export default router;
