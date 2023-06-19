import { NextFunction, Request, Response } from 'express';
import UserGroupService from '../services/UserGroupService';

export default class IndexController {
  static async addUsersToGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId, userIds } = req.body;
      const result = await UserGroupService.createUserGroup(groupId, userIds);
      if (result) {
        res.send(result);
      } else {
        res.send('failed.');
      }
    } catch (e) {
      return next(e);
    }
  }
  // didnt work
  static occurUncaughtError() {
    const uselessReturn = 'Hello';
    throw new Error('UncaughtError');
    return uselessReturn;
  }

  static async occurPromiserejection() {
    const uselessReturn = 'Hello';
    Promise.reject(new Error('a rejection'));
    return uselessReturn;
  }
}
