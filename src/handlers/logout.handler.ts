import { Request, Response } from 'express'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { UserLoader } from '../loaders/user.loader'
import { ResponseModel } from '../models/response.model'
import { AsyncVoidType } from '../types/async-void.type'
import { RequestDataHelper } from '../helpers/request-data.helper'
import { OrErrorType } from '../types/or-error.type'

export class LogoutHandler {
  public static async handle(req: Request, res: Response): AsyncVoidType {
    const token: OrErrorType<string> = RequestDataHelper.tokenVerification(req.headers.authorization)

    if(token instanceof Error) {
      res
        .status(HttpStatusEnum.BadRequest)
        .send(new ResponseModel({ description: `${token.message}` }))
      return
    }

    const params: OrErrorType<boolean> = RequestDataHelper.queryParamsVerification(req.query.all)

    if (params instanceof Error) {
      res
        .status(HttpStatusEnum.BadRequest)
        .send(new ResponseModel({ description: params.message }))
      return
    }

    const result: number = await UserLoader.removeToken(token, params)

    res
      .status(HttpStatusEnum.OK)
      .send(new ResponseModel({ description: `${result} tokens removed` }))
    return
  }
}
