import { Request, Response } from 'express'
import { DbErrorEnum } from '../enums/db-error.enum'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { DataHelper } from '../helpers/data.helper'
import { PasswordHelper } from '../helpers/password.helper'
import { UserIDTypeHelper } from '../helpers/user-id-type.helper'
import { UserLoader } from '../loaders/user.loader'
import { TokenModel } from '../models/entities/token.model'
import { UserModel } from '../models/entities/user.model'
import { ResponseModel } from '../models/response.model'
import { OrErrorType } from '../types/or-error-model.type'

export class RegistrationHandler {
  public static async handle(req: Request, res: Response) {
    const user: OrErrorType<UserModel> = await UserLoader.saveUser(new UserModel({
      id: DataHelper.createUUID(),
      userID: req.body.id,
      userIDType: UserIDTypeHelper.check(req.body.id),
      password: await PasswordHelper.hash(req.body.password)
    }))
      .catch<Error>(DataHelper.cast)

    if (user instanceof Error)  {
       if (user.message === DbErrorEnum.UniqueViolation) {
         return res
           .status(HttpStatusEnum.BadRequest)
           .send(new ResponseModel({ description: `User's ID '${req.body.id}' is already in use` }))
       }

       return res
         .status(HttpStatusEnum.BadRequest)
         .send(new ResponseModel({ description: user.message }))
    }

    const bearerToken = DataHelper.createUUID()

    const token: OrErrorType<TokenModel> = await UserLoader.saveToken(new TokenModel({
      id: user.id,
      token: bearerToken,
      expirationTime: new Date()
    }))
      .catch<Error>(DataHelper.cast)

    if (token instanceof Error) {
      return res
        .status(HttpStatusEnum.BadRequest)
        .send(new ResponseModel({ description: token.message }))
    }

    return res
      .status(HttpStatusEnum.Created)
      .setHeader('Authorization', `Bearer ${bearerToken}`)
      .send(new ResponseModel({ description: `User successfully created` }))
  }
}
