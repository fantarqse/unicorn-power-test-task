import { Request, Response } from 'express'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { UserLoader } from '../loaders/user.loader'
import { UserModel } from '../models/entities/user.model'
import { ResponseModel } from '../models/response.model'
import { MaybeType } from '../types/maybe.type'

export class InfoHandler {
  public static async handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const bearerToken: MaybeType<string> = req.headers.authorization

    if (!bearerToken) {
      return res
        .status(HttpStatusEnum.BadRequest)
        .send(new ResponseModel({ description: `Token is not found` }))
    }

    const token: string = bearerToken.split(' ')[1]
    const user = await UserLoader.getUserByToken(token)

    if (!user) {
      return res
        .status(HttpStatusEnum.NotFound)
        .send(new ResponseModel({ description: `User is not found` }))
    }

    console.log(user)
    return res
      .status(HttpStatusEnum.OK)
      .send(new ResponseModel({description: ''}))
  }
}
