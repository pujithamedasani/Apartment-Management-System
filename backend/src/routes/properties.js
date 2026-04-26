import { Router } from 'express';
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/',       getProperties);
router.post('/',      authorize('Admin'), createProperty);
router.put('/:id',    authorize('Admin'), updateProperty);
router.delete('/:id', authorize('Admin'), deleteProperty);

export default router;
