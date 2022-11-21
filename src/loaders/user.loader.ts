import { DataHelper } from '../helpers/data.helper'
import { DbHelper } from '../helpers/db.helper'
import { TokenModel } from '../models/entities/token.model'
import { UserModel } from '../models/entities/user.model'
import { MaybeType } from '../types/maybe.type'

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

  /**
   * Gets user from DB by user's ID (email or phone)
   */
  public static async getUserByID(userID: string): Promise<MaybeType<UserModel>> {
    return DbHelper.getConnection()
      .manager
      .findOneBy<UserModel>(UserModel, { userID: userID })
      .then<MaybeType<UserModel>>(DataHelper.cast)
  }

  /**
   * Gets user from DB by token
   */
  public static async getUserByToken(token: string) {
    return DbHelper.getConnection()
      .getRepository<TokenModel>(TokenModel)
      //.find({ relations: { user: true } })
  }

  /**
   * Gets token from DB by ID
   */
  public static async getToken(id: string) {
    return DbHelper.getConnection()
      .manager
      .findOneBy<TokenModel>(TokenModel, { id: id })
      .then<MaybeType<TokenModel>>(DataHelper.cast)
  }

  public static async updateToken(token: string) {}
  public static async removeToken(all: boolean, token?: string) {} // Not sure about 'token'
}
