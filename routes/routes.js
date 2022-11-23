import { Router } from 'express';
import autoRoutes from './auto.routes.js';

const router = Router();

router.use(autoRoutes);

export default router;