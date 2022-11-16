import { EMAIL_REGEXP } from '../consts/email-regexp.const'
import { UserIDTypeEnum } from '../enums/user-id-type.enum'

export class UserIDTypeHelper {
  /**
   * Parse User's ID and return ID's type
   */
  public static check(id: string): UserIDTypeEnum {
    if (id.match(EMAIL_REGEXP)) {
      return UserIDTypeEnum.Email
    }
    return UserIDTypeEnum.Phone
  }
}
