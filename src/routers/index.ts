import express from 'express';
import userRouter from './user';
import groupRouter from './group';
import IndexController from '../controllers';

const indexRouter = express.Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/group', groupRouter);
indexRouter.use('/user-group', IndexController.addUsersToGroup);

export default indexRouter;
