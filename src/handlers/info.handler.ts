import { Request, Response } from 'express'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { UserLoader } from '../loaders/user.loader'
import { ResponseModel } from '../models/response.model'
import { AsyncVoidType } from '../types/async-void.type'
import { MaybeType } from '../types/maybe.type'

export class InfoHandler {
  public static async handle(req: Request, res: Response): AsyncVoidType {
    const bearerToken: MaybeType<string> = req.headers.authorization

    if (!bearerToken) {
      res
        .status(HttpStatusEnum.BadRequest)
        .send(new ResponseModel({ description: `Token is not found` }))
      return
    }

    const token: string = bearerToken.split(' ')[1]
    const user = await UserLoader.getUserByToken(token)

    if (!user) {
      res
        .status(HttpStatusEnum.NotFound)
        .send(new ResponseModel({ description: `User is not found` }))
      return
    }

    console.log(user)
    res
      .status(HttpStatusEnum.OK)
      .send(new ResponseModel({description: ''}))
    return
  }
}
