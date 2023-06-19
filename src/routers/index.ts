import express from 'express';
import userRouter from './user';
import groupRouter from './group';
import IndexController from '../controllers';
import { checkToken } from '../middleware/authenticate';

const indexRouter = express.Router();

indexRouter.use('/', checkToken);
indexRouter.use('/user', userRouter);
indexRouter.use('/group', groupRouter);
indexRouter.use('/user-group', IndexController.addUsersToGroup);
indexRouter.use('/uncaught', IndexController.occurUncaughtError);
indexRouter.use('/rejected', IndexController.occurPromiserejection);

export default indexRouter;
