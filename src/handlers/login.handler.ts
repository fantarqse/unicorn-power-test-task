import { Request, Response } from 'express'
import { AUTHORIZATION } from '../consts/authorization.const'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { PasswordHelper } from '../helpers/password.helper'
import { UserLoader } from '../loaders/user.loader'
import { TokenModel } from '../models/entities/token.model'
import { UserModel } from '../models/entities/user.model'
import { ResponseModel } from '../models/response.model'
import { MaybeType } from '../types/maybe.type'

export class LoginHandler {
  public static async handle(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const user: MaybeType<UserModel> = await UserLoader.getUserByID(req.body.id)

    if (!user) {
      return res
        .status(HttpStatusEnum.NotFound)
        .send(new ResponseModel({ description: `User '${req.body.id}' is not found` }))
    }

    const isVerifiedPassword: boolean = await PasswordHelper.verify(
      req.body.password,
      user.password
    )

    if (!isVerifiedPassword) {
      return res
        .status(HttpStatusEnum.Forbidden)
        .send(new ResponseModel({ description: `Password '${req.body.password}' is not verified` }))
    }

    const token: MaybeType<TokenModel> = await UserLoader.getToken(user.id)

    if (!token) {
      return res
        .status(HttpStatusEnum.NotFound)
        .send(new ResponseModel({ description: `Token is not found` }))
    }
    console.log(user)
    console.log(token)
    return res
      .setHeader(AUTHORIZATION, `Bearer ${token.token}`)
      .status(HttpStatusEnum.OK)
      .send(new ResponseModel({ description: `User successfully login` }))
  }
}
