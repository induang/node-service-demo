import db from '../models';
import { v4 as uuidv4 } from 'uuid';
import { Group, GroupParams } from '../types/group.type';

export default class GroupService {
  static async queryAllGroups() {
    let groupRecords: Array<Group> | null = null;
    try {
      groupRecords = await db.Group.findAll();
    } catch (e) {
      console.log(e);
    }
    return groupRecords;
  }

  static async queryGroupByID(id:string) {
    let groupRecords: Array<Group> | null = null;
    try {
      groupRecords = await db.Group.findAll({
        where: {
          id
        }
      });
    } catch (e) {
      console.log(e);
    }
    return groupRecords;
  }

  static async createGroup(group: GroupParams) {
    let groupRecord: Group | null = null;
    try {
      groupRecord = await db.Group.create({ id: uuidv4(), ...group });
    } catch (e) {
      console.log(e);
    }
    return groupRecord;
  }

  static async updateGroup(id: string, group: GroupParams) {
    let rows;
    try {
      rows = await db.Group.update(group, {
        where: {
          id
        }
      });
    } catch (e) {
      console.log(e);
    }
    return rows;
  }

  static async deleteGroup(id: string) {
    let result = 0;
    try {
      const group = (await db.Group.findAll({
        where: {
          id
        }
      }))[0];
      group.removeUsers();
      result = await db.Group.destroy({
        where: {
          id
        }
      });
    } catch (e) {
      console.log(e);
    }
    return result;
  }
}
