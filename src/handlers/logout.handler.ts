import { Request, Response } from 'express'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { AsyncVoidType } from '../types/async-void.type'

export class LogoutHandler {
  public static async handle(req: Request, res: Response): AsyncVoidType {
    // const user =

    res
      .status(HttpStatusEnum.OK)
      .send()
    return
  }
}
