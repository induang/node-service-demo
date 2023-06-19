import { NextFunction, Request, Response } from 'express';
import GroupService from '../services/GroupService';
import { GroupParams } from '../types/group.type';

export default class GroupController {
  static async getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await GroupService.queryAllGroups();
      res.send(groups);
    } catch (e) {
      return next(e);
    }
  }

  static async getGroupByID(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const group = await GroupService.queryGroupByID(id);
      if (group?.length) {
        res.send(group);
      } else {
        res.send(`The group ${id} isnt exist.`);
      }
    } catch (e) {
      return next(e);
    }
  }

  static async addGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const newGroup: GroupParams = req.body;
      const group = await GroupService.createGroup(newGroup);
      if (group) {
        res.send({
          successful: true,
          result: group
        });
      } else {
        res.send({
          successful: false,
          result: {}
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  static async updateGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedGroup: GroupParams = req.body;
      const rows = await GroupService.updateGroup(id, updatedGroup);
      if (rows[0]) {
        res.send({
          successful: true,
          message: `The group ${updatedGroup.name} updated.\n`
        });
      } else {
        res.send({
          successful: false
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  static async dropGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await GroupService.deleteGroup(id);
      if (result) {
        res.send({
          successful: true,
          message: `The group ${id} deleted.\n`
        });
      } else {
        res.send({
          successful: false
        });
      }
    } catch (e) {
      return next(e);
    }
  }
}
