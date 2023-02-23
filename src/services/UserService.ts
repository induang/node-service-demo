import { User, UserParmas } from '../types/user.type';
import db from '../models';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';


export default class UserService {
  static async queryAllUser() {
    let userRecords: Array<User> | null = null;
    try {
      userRecords = await db.User.findAll({
        where: {
          isDeleted: false
        }
      });
    } catch (e) {
      console.log(e);
    }
    return userRecords;
  }

  static async queryUserByID(id: string) {
    let userRecords: Array<User> | null = null;
    try {
      userRecords = await db.User.findAll({
        where: {
          [Op.and]: [{ id }, { isDeleted: false }]
        }
      });
    } catch (e) {
      console.log(e);
    }
    return userRecords;
  }

  static async queryUserByLogin(loginSubstring: string, limit: number) {
    let userRecords: Array<User> | null = null;
    try {
      userRecords = await db.User.findAll({
        where: {
          [Op.and]: [{ login: { [Op.substring]: loginSubstring } }, { isDeleted: false }]
        },
        limit
      });
    } catch (e) {
      console.log(e);
    }
    return userRecords;
  }

  static async updateUser(id: string, user: UserParmas) {
    let rows;
    try {
      rows = await db.User.update(user, {
        where: {
          [Op.and]: [{ id }, { isDeleted: false }]
        }
      });
    } catch (e) {
      console.log(e);
    }
    return rows;
  }

  static async addUser(user: UserParmas) {
    let userRecord: User | null = null;
    try {
      userRecord = await db.User.create({ ...user, id: uuidv4(), isDeleted: false });
    } catch (e) {
      console.log(e);
    }
    return userRecord;
  }

  static async deleteUser(id: string) {
    let rows;
    try {
      rows = await db.User.update({ isDeleted: true }, {
        where: {
          [Op.and]: [{ id }, { isDeleted: false }]
        }
      });
      if (rows[0]) {
        const user = (await db.User.findAll({
          where: {
            id
          }
        }))[0];
        user.removeGroups();
      }
    } catch (e) {
      console.log(e);
    }
    return rows;
  }
}
