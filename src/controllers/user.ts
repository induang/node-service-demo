import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { TypedRequestQuery, UserParmas } from '../types/user.type';

export default class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await UserService.queryAllUser();
    res.send(users);
  }

  static async getUserByID(req: Request, res: Response) {
    const { id } = req.params;
    const users = await UserService.queryUserByID(id);
    if (users?.length) {
      res.send(users);
    } else {
      res.send(`The user ${id} isnt exist.`);
    }
  }

  static async searchUsers(req: TypedRequestQuery<{loginSubstring: string; limit:number;}>, res: Response) {
    const { loginSubstring, limit } = req.query;
    const users = await UserService.queryUserByLogin(loginSubstring, limit);
    res.send(users);
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updatedUser: UserParmas = req.body;
    const rows = await UserService.updateUser(id, updatedUser);
    if (rows[0]) {
      res.send(`The user ${updatedUser.login} updated.\n`);
    } else {
      res.send(`The user ${id} isnt exist.`);
    }
  }

  static async addUser(req: Request, res: Response) {
    const newUser: UserParmas = req.body;
    const user = await UserService.addUser(newUser);
    if (user) {
      res.send(`The user ${user.login} added.\n`);
    } else {
      res.send('dont know why.');
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const rows = await UserService.deleteUser(id);
    if (rows[0]) {
      res.send(`The user ${id} deleted.\n`);
    } else {
      res.send(`The user ${id} isnt exist.`);
    }
  }
}
