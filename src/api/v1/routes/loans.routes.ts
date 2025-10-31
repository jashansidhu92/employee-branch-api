import { Router } from 'express';
import { LoansController } from '../controllers/loans.controller.js';
import { authenticate } from '../../../middleware/auth.middleware.js';
import { requireRoles } from '../../../middleware/role.middleware.js';


const r = Router();


r.use(authenticate);


r.get('/', LoansController.list);
r.get('/:id', LoansController.get);


r.post('/', requireRoles('admin', 'user'), LoansController.create);


r.post('/:id/review', requireRoles('admin'), LoansController.review);
r.post('/:id/approve', requireRoles('admin'), LoansController.approve);
r.post('/:id/reject', requireRoles('admin'), LoansController.reject);


export default r;