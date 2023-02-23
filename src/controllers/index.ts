import { Request, Response } from 'express';
import UserGroupService from '../services/UserGroupService';

export default class IndexController {
  static async addUsersToGroup(req: Request, res: Response) {
    const { groupId, userIds } = req.body;
    const result = await UserGroupService.createUserGroup(groupId, userIds);
    if (result) {
      res.send(result);
    } else {
      res.send('failed.');
    }
  }
}
