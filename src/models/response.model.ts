import { MaybeType } from '../types/maybe.type'

export class ResponseModel {
  /**
   * Description of response
   */
  public readonly description: string

  /**
   * User's ID (Email or Phone)
   */
  public readonly userID?: MaybeType<string>

  /**
   * User's ID's type
   */
  public readonly userIDType?: MaybeType<string>

  public constructor(params: ResponseModel) {
    this.description = params.description
    this.userID = params.userID
    this.userIDType = params.userIDType
  }
}
