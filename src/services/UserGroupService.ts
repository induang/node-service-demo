import db from '../models';


export default class UserGroupService {
  static async createUserGroup(groupId: string, userIds: Array<string>) {
    let result;
    try {
      result = await db.sequelize.transaction(async (t: any) => {
        const group = (await db.Group.findAll({
          where: {
            id: groupId
          }
        }, { transaction: t }))[0];
        const records = {
          group: group.name,
          users: [] as Array<string>
        };
        for (const id of userIds) {
          const user = (await db.User.findAll({
            where: {
              id
            }
          }, { transaction: t }))[0];
          await user.addGroup(group, { transaction: t });
          records.users.push(user.login);
        }
        return records;
      });
    } catch (e) {
      console.log(e);
    }
    return result;
  }
}

