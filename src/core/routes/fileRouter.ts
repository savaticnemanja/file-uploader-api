import express from 'express';
import { fileController } from '../controllers';
import { authenticated, isAdmin, uploadFile } from '../middlewares';

const router = express.Router();

router.post('/', authenticated, uploadFile, fileController.createOne);

router.delete('/:id', authenticated, isAdmin, fileController.deleteOne);

export default router;
