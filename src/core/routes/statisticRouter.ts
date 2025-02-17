import express from 'express';
import { statisticController } from '../controllers';
import { authenticated, isAdmin } from '../middlewares';

const router = express.Router();

router.get('/', authenticated, isAdmin, statisticController.get);

export default router;
