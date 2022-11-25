import { Request, Response } from 'express'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { UserLoader } from '../loaders/user.loader'
import { ResponseModel } from '../models/response.model'
import { AsyncVoidType } from '../types/async-void.type'
import { RequestDataHelper } from '../helpers/request-data.helper'
import { OrErrorType } from '../types/or-error.type'
import { NOTHING } from '../consts/nothing.const'

export class LogoutHandler {
  public static async handle(req: Request, res: Response): AsyncVoidType {
    const token: OrErrorType<string> = RequestDataHelper.checkToken(req.headers.authorization)

    if(token instanceof Error) {
      res
        .status(HttpStatusEnum.BadRequest)
        .send(new ResponseModel({ description: `${token.message}` }))
      return
    }

    const all: OrErrorType<boolean> = RequestDataHelper.checkQueryParams(req.query.all)

    if (all instanceof Error) {
      res
        .status(HttpStatusEnum.BadRequest)
        .send(new ResponseModel({ description: all.message }))
      return
    }

    const result: number = await UserLoader.removeToken(all ? NOTHING : token)

    res
      .status(HttpStatusEnum.OK)
      .send(new ResponseModel({ description: `${result} tokens removed` }))
    return
  }
}
