import { Router } from 'express';
import {
  getApartments,
  createApartment,
  updateApartment,
  deleteApartment,
} from '../controllers/apartmentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/',       getApartments);
router.post('/',      authorize('Admin'), createApartment);
router.put('/:id',    authorize('Admin'), updateApartment);
router.delete('/:id', authorize('Admin'), deleteApartment);

export default router;
