import { DbHelper } from '../helpers/db.helper'
import { UserModel } from '../models/entities/user.model'

export class UserLoader {
  /**
   * Saves a new user to DB
   */
  public static async saveUser(user: UserModel) {
    return DbHelper.getConnection()
      .getRepository<UserModel>(UserModel)
      .insert(user)
      .catch((error) => console.log(error))
  }

  /**
   * TODO: Checker
   */
  public static async getUser() {
    return DbHelper.getConnection()
      .getRepository<UserModel>(UserModel)
      .find()
  }
}
