import { DataHelper } from '../helpers/data.helper'
import { DbHelper } from '../helpers/db.helper'
import { TokenModel } from '../models/entities/token.model'
import { UserModel } from '../models/entities/user.model'
import { NothingType } from '../types/nothing.type'

export class UserLoader {
  /**
   * Saves a new user to DB
   */
  public static async saveUser(user: UserModel): Promise<UserModel> {
    return DbHelper.getConnection()
      .manager
      .save<UserModel>(user)
  }

  /**
   * Saves a new token to DB
   */
  public static async saveToken(token: TokenModel): Promise<TokenModel> {
    return DbHelper.getConnection()
      .manager
      .save<TokenModel>(token)
  }

  public static async getUserID(token: string) {}
  public static async updateToken(token: string) {}
  public static async removeToken(all: boolean, token?: string) {} // Not sure about 'token'
}
