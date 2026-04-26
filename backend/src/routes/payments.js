import { Router } from 'express';
import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/',       getPayments);
router.post('/',      authorize('Admin'), createPayment);
router.put('/:id',    authorize('Admin'), updatePayment);
router.delete('/:id', authorize('Admin'), deletePayment);

export default router;
