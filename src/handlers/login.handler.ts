import { Request, Response } from 'express'
import { AUTHORIZATION } from '../consts/authorization.const'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { PasswordHelper } from '../helpers/password.helper'
import { UserLoader } from '../loaders/user.loader'
import { TokenModel } from '../models/entities/token.model'
import { UserModel } from '../models/entities/user.model'
import { ResponseModel } from '../models/response.model'
import { UserWithTokenModel } from '../models/user-with-token.model'
import { AsyncVoidType } from '../types/async-void.type'
import { MaybeType } from '../types/maybe.type'

export class LoginHandler {
  public static async handle(req: Request, res: Response): AsyncVoidType {
    const user: MaybeType<UserWithTokenModel> = await UserLoader.getUserAndToken(req.body.id)
    console.log(user)

    if (!user) {
      res
        .status(HttpStatusEnum.NotFound)
        .send(new ResponseModel({ description: `User '${req.body.id}' is not found` }))
      return
    }

    const isVerifiedPassword: boolean = await PasswordHelper.verify(
      req.body.password,
      user.password
    )

    if (!isVerifiedPassword) {
      res
        .status(HttpStatusEnum.Forbidden)
        .send(new ResponseModel({ description: `Password '${req.body.password}' is not verified` }))
      return
    }

    if (!user.token) {
      res
        .status(HttpStatusEnum.NotFound)
        .send(new ResponseModel({ description: `Token is not found` }))
      return
    }

    res
      .setHeader(AUTHORIZATION, `Bearer ${user.token}`)
      .status(HttpStatusEnum.OK)
      .send(new ResponseModel({ description: `User successfully login` }))
    return
  }
}
