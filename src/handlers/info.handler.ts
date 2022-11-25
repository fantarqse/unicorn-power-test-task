import { Request, Response } from 'express'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { DataHelper } from '../helpers/data.helper'
import { UserLoader } from '../loaders/user.loader'
import { TokenModel } from '../models/entities/token.model'
import { ResponseModel } from '../models/response.model'
import { AsyncVoidType } from '../types/async-void.type'
import { OrErrorType } from '../types/or-error.type'
import { RequestDataHelper } from '../helpers/request-data.helper'

export class InfoHandler {
  public static async handle(req: Request, res: Response): AsyncVoidType {
    const token: OrErrorType<string> = RequestDataHelper.checkToken(req.headers.authorization)

    if (token instanceof Error) {
      res
        .status(HttpStatusEnum.BadRequest)
        .send(new ResponseModel({ description: `Token is not found` }))
      return
    }

    const user = await UserLoader.getUserByToken(token)

    if (!user) {
      res
        .status(HttpStatusEnum.NotFound)
        .send(new ResponseModel({ description: `User is not found` }))
      return
    }

    const refreshToken: OrErrorType<TokenModel> = await UserLoader.saveToken(new TokenModel({
      id: user.id,
      token: token,
      expirationTime: new Date
    }))
      .catch<Error>(DataHelper.cast)

    if (refreshToken instanceof Error) {
      res
        .status(HttpStatusEnum.InternalServerError)
        .send(new ResponseModel({ description: `Token's expiration time is not updated` }))
      return
    }

    res
      .status(HttpStatusEnum.OK)
      .send(new ResponseModel({
        description: `User's data successfully returned`,
        userID: user.userID,
        userIDType: user.userIDType
      }))
    return
  }
}
