import type { Express } from 'express';
import {
  adminRouter,
  authRouter,
  documentationRouter,
  fileRouter,
  paymentRouter,
  projectRouter,
  statisticRouter,
  userRouter,
} from './routes';

export default (app: Express): void => {
  app.use('/api/admin', adminRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/documentations', documentationRouter);
  app.use('/api/files', fileRouter);
  app.use('/api/payments', paymentRouter);
  app.use('/api/projects', projectRouter);
  app.use('/api/statistics', statisticRouter);
  app.use('/api/users', userRouter);
};
