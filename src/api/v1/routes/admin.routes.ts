import { Router } from 'express';
import { authenticate } from '../../../middleware/auth.middleware.js';
import { requireRoles } from '../../../middleware/role.middleware.js';


const admin = Router();
admin.use(authenticate, requireRoles('admin'));


admin.get('/health', (_req, res) => res.json({ ok: true }));


export default admin;