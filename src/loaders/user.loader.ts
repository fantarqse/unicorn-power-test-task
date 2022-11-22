import { DbHelper } from '../helpers/db.helper'
import { TokenModel } from '../models/entities/token.model'
import { UserModel } from '../models/entities/user.model'
import { UserWithTokenModel } from '../models/user-with-token.model'
import { MaybeType } from '../types/maybe.type'
import { UserClientType } from '../types/user-client.type'

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
   * Saves a new token to DB & refreshes an existing token
   */
  public static async saveToken(token: TokenModel): Promise<TokenModel> {
    return DbHelper.getConnection()
      .manager
      .save<TokenModel>(token)
  }

  public static async getUserAndToken(userID: string): Promise<MaybeType<UserWithTokenModel>> {
    const sql: string = `
      SELECT
        u.${UserModel.userID} AS "userID",
        u.${UserModel.userIDType} AS "userIDType",
        u.${UserModel.password} AS "password",
        t.${TokenModel.token} AS "token"
      FROM
        public.${UserModel.tableName} u
      JOIN
        public.${TokenModel.tableName} t
      ON 
        t.${TokenModel.id} = u.${UserModel.id}
      WHERE
        u.${UserModel.userID} = $1
    `

    return DbHelper.getConnection()
      .query(sql, new Array<any>(userID))
      .then((users: ReadonlyArray<UserWithTokenModel>): MaybeType<UserWithTokenModel> => users[0])
  }

  /**
   * Gets user from DB by token
   */
  public static async getUserByToken(token: string): Promise<MaybeType<UserClientType>> {
    const sql: string = `
      SELECT
        u.${UserModel.id},
        u.${UserModel.userID} AS "userID",
        u.${UserModel.userIDType} AS "userIDType"
      FROM
        public.${UserModel.tableName} u
      JOIN
        public.${TokenModel.tableName} t
      ON 
        t.${TokenModel.id} = u.${UserModel.id}
      WHERE
        t.${TokenModel.token} = $1
    `

    return DbHelper.getConnection()
      .query(sql, new Array<any>(token))
      .then((users: ReadonlyArray<UserClientType>): MaybeType<UserClientType> => users[0])
  }

  /**
   * Removes token from DB
   */
  public static async removeToken(token: string, all: boolean): Promise<number> {
    let sql: string
    if (all) {
      sql = `
        DELETE FROM
          public.${TokenModel.tableName} t
      `

      return DbHelper.getConnection()
        .query(sql)
        .then((tokens): number => tokens[1])

    } else {
      sql = `
        DELETE FROM
          public.${TokenModel.tableName} t
        WHERE
          t.${TokenModel.token} = $1
      `

      return DbHelper.getConnection()
        .query(sql, new Array<any>(token))
        .then((tokens): number => tokens[1])
    }
  }
}
