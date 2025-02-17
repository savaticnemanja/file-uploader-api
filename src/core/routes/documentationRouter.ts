import express from 'express';
import { documentationController } from '../controllers';
import { authenticated, isAdmin, uploadDocumentation } from '../middlewares';

const router = express.Router();

router.get('/', authenticated, documentationController.getMany);
router.post('/', authenticated, isAdmin, uploadDocumentation, documentationController.createOne);

router.patch('/:id', authenticated, isAdmin, documentationController.updateOne);
router.delete('/:id', authenticated, isAdmin, documentationController.deleteOne);

export default router;
