import { UserIDTypeEnum } from '../enums/user-id-type.enum'

export class UserWithTokenModel {
  /**
   * User's ID (email or phone)
   */
  public readonly userID: string

  /**
   * User's ID's type
   */
  public readonly userIDType: UserIDTypeEnum

  /**
   * Hashed user's password
   */
  public readonly password: string

  /**
   * Token
   */
  public readonly token: string

  public constructor(params: UserWithTokenModel) {
    this.userID = params.userID
    this.userIDType = params.userIDType
    this.password = params.password
    this.token = params.token
  }
}
