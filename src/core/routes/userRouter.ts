import express from 'express';
import { authenticated } from '../middlewares';
import { userController } from '../controllers';

const router = express.Router();

router.get('/current', authenticated, userController.getCurrent);
router.patch('/current', authenticated, userController.updateCurrent);

router.patch('/current/password', authenticated, userController.updatePassword);

router.get('/current/projects', authenticated, userController.getAllProjects);

export default router;
