import express from 'express';
import { adminController } from '../controllers';
import { authenticated, isAdmin } from '../middlewares';

const router = express.Router();

router.get('/users', authenticated, isAdmin, adminController.getManyUsers);
router.post('/users', authenticated, isAdmin, adminController.createOneUser);

router.patch('/users/:id', authenticated, isAdmin, adminController.updateOneUser);
router.delete('/users/:id', authenticated, isAdmin, adminController.deleteOneUser);

router.patch('/users/:userId/projects/:projectId', authenticated, isAdmin, adminController.addProjectToUser);
router.delete('/users/:userId/projects/:projectId', authenticated, isAdmin, adminController.removeProjectFromUser);

export default router;
