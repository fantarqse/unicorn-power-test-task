import { Request, Response } from 'express';
import { HttpStatusEnum } from '../enums/http-status.enum';
import {UserLoader} from '../loaders/user.loader';

export class CheckHandler {
  public static async handle(req: Request, res: Response) {
    console.log('CheckHandler')
    const dbUser = await UserLoader.getUser()
    console.log(dbUser)
    return res.sendStatus(HttpStatusEnum.OK)
  }
}
