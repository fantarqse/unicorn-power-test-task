import { Request, Response } from 'express'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { UserLoader } from '../loaders/user.loader'
import { ResponseModel } from '../models/response.model'
import { AsyncVoidType } from '../types/async-void.type'
import { MaybeType } from '../types/maybe.type'

export class LogoutHandler {
  public static async handle(req: Request, res: Response): AsyncVoidType {
    const bearerToken: MaybeType<string> = req.headers.authorization

    if(!bearerToken) {
      res
        .status(HttpStatusEnum.BadRequest)
        .send(new ResponseModel({ description: `Token is not found` }))
      return
    }

    let all: boolean
    switch (req.query.all) {
      case 'true':
        all = true
        break
      case 'false':
        all = false
        break
      default:
        res
          .status(HttpStatusEnum.BadRequest)
          .send(new ResponseModel({ description: `Query params error: value 'all' has to be 'true' or 'false'` }))
        return
    }

    const token: string = bearerToken.split(' ')[1]
    const result: number = await UserLoader.removeToken(token, all)

    if (result === 0) {
      res
        .status(HttpStatusEnum.InternalServerError)
        .send(new ResponseModel({ description: `Token is not removed` }))
      return
    }

    res
      .status(HttpStatusEnum.OK)
      .send(new ResponseModel({ description: `${result} tokens removed` }))
    return
  }
}
