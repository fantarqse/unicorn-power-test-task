import { Request, Response } from 'express'
import { HttpStatusEnum } from '../enums/http-status.enum'
import { DataHelper } from '../helpers/data.helper'
import { PasswordHelper } from '../helpers/password.helper'
import { UserIDTypeHelper } from '../helpers/user-id-type.helper'
import { UserLoader } from '../loaders/user.loader'
import { UserModel } from '../models/entities/user.model'
import { ErrorModel } from '../models/error.model'

export class RegistrationHandler {
  public static async handle(req: Request, res: Response) {
    console.log('RegistrationHandler')
    console.log(req.body)

    const result = await UserLoader.saveUser(new UserModel({
      id: DataHelper.createUUID(),
      userID: req.body.id,
      userIDType: UserIDTypeHelper.check(req.body.id),
      password: await PasswordHelper.hash(req.body.password)
    }))

    //TODO ??: Add JWT create method
    // Returns JSON with Status and JWT?
    return res.sendStatus(HttpStatusEnum.Created)
  }
}
