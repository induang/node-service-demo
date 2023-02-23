import { Request, Response } from 'express';
import GroupService from '../services/GroupService';
import { GroupParams } from '../types/group.type';

export default class GroupController {
  static async getAllGroups(req: Request, res: Response) {
    const groups = await GroupService.queryAllGroups();
    res.send(groups);
  }

  static async getGroupByID(req: Request, res: Response) {
    const { id } = req.params;
    const group = await GroupService.queryGroupByID(id);
    if (group?.length) {
      res.send(group);
    } else {
      res.send(`The group ${id} isnt exist.`);
    }
  }

  static async addGroup(req: Request, res: Response) {
    const newGroup: GroupParams = req.body;
    const group = await GroupService.createGroup(newGroup);
    if (group) {
      res.send(`The group ${group.name} added.\n`);
    } else {
      res.send('dont know why.');
    }
  }

  static async updateGroup(req: Request, res: Response) {
    const { id } = req.params;
    const updatedGroup: GroupParams = req.body;
    const rows = await GroupService.updateGroup(id, updatedGroup);
    if (rows[0]) {
      res.send(`The group ${updatedGroup.name} updated.\n`);
    } else {
      res.send(`The group ${id} isnt exist.`);
    }
  }

  static async dropGroup(req: Request, res: Response) {
    const { id } = req.params;
    const result = await GroupService.deleteGroup(id);
    if (result) {
      res.send(`The group ${id} deleted.\n`);
    } else {
      res.send(`The group ${id} isnt exist.`);
    }
  }
}
