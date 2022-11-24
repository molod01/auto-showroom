import { Router } from 'express';
import autoRoutes from './auto.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

router.use(authRoutes);
router.use(autoRoutes);

export default router;