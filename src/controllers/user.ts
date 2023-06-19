import * as dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { LoginRequest, TypedRequestQuery, User, UserParmas } from '../types/user.type';
import jwt from 'jsonwebtoken';


const privateKey = process.env.ENCODE_KEY || '';
export default class UserController {
  static async login(req: Request, res: Response) {
    const loginer: LoginRequest = req.body;
    const finedUser: User | null = await UserService.queryUserByLogin(loginer.username);
    if (!finedUser || finedUser.password !== loginer.password) {
      return res.send('Bad username/password combination.');
    }
    const payload = { name: finedUser.login, age: finedUser.age };
    const token = jwt.sign(payload, privateKey, { expiresIn: 600 });

    return res.status(200).send({
      message: 'Login Succeed.',
      token
    });
  }

  static async getAllUsers(req: Request, res: Response) {
    // throw new Error('Hello, Error');
    await UserService.queryAllUser().then((data) => res.send(data));
  }

  static async getUserByID(req: Request, res: Response) {
    const { id } = req.params;
    await UserService.queryUserByID(id).then((data) => {
      if (data?.length) {
        res.send(data);
      } else {
        res.send(`The user ${id} isnt exist.`);
      }
    });
  }

  static async searchUsers(req: TypedRequestQuery<{loginSubstring: string; limit:number;}>, res: Response) {
    const { loginSubstring, limit } = req.query;
    const users = await UserService.queryUsersByLogin(loginSubstring, limit);
    res.send(users);
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updatedUser: UserParmas = req.body;
    const rows = await UserService.updateUser(id, updatedUser);
    if (rows[0]) {
      res.send({
        successful: true
      });
    } else {
      res.send({
        successful: false
      });
    }
  }

  static async addUser(req: Request, res: Response) {
    const newUser: UserParmas = req.body;
    const user = await UserService.addUser(newUser);
    if (user) {
      res.send({
        successful: true,
        result: user
      });
    } else {
      res.send({
        successful: false,
        result: {}
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const rows = await UserService.deleteUser(id);
    if (rows[0]) {
      res.send({
        successful: true,
        massage: `The user ${id} deleted.\n`
      });
    } else {
      res.send({
        successful: false
      });
    }
  }
}
