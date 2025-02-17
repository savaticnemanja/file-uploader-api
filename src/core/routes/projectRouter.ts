import express from 'express';
import { projectController } from '../controllers';
import { authenticated, isAdmin } from '../middlewares';

const router = express.Router();

router.get('/', authenticated, isAdmin, projectController.getMany);
router.post('/', authenticated, isAdmin, projectController.createOne);

router.patch('/:id', authenticated, isAdmin, projectController.updateOne);
router.delete('/:id', authenticated, isAdmin, projectController.deleteOne);

router.get('/:id/payments', authenticated, projectController.getManyPayments);

router.get('/link/:link', authenticated, projectController.getOneByLink);

export default router;
