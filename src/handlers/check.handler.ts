import { Request, Response } from 'express';
import { HttpStatusEnum } from '../enums/http-status.enum';

export class CheckHandler {
  public static handle(req: Request, res: Response) {
    console.log('CheckHandler')
    return res.sendStatus(HttpStatusEnum.OK)
  }
}
