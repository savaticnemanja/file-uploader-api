import express from 'express';
import { paymentController } from '../controllers';
import { authenticated, isAdmin } from '../middlewares';

const router = express.Router();

router.post('/', authenticated, isAdmin, paymentController.createOne);

router.patch('/:id', authenticated, isAdmin, paymentController.updateOne);
router.delete('/:id', authenticated, isAdmin, paymentController.deleteOne);

export default router;
