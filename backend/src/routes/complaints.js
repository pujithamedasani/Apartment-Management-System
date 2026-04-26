import { Router } from 'express';
import {
  getComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
} from '../controllers/complaintController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);

router.get('/',       getComplaints);
router.post('/',      authorize('Resident'), createComplaint);
router.put('/:id',    authorize('Admin', 'Staff'), updateComplaint);
router.delete('/:id', authorize('Admin'), deleteComplaint);

export default router;
