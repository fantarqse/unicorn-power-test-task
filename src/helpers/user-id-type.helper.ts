import { EMAIL_REGEXP } from '../consts/email-regexp.const'
import { PHONE_REGEXP } from '../consts/phone-regexp.const'
import { UserIDTypeEnum } from '../enums/user-id-type.enum'
import { OrErrorType } from '../types/or-error.type'

export class UserIDTypeHelper {
  /**
   * Parses User's ID and returns ID's type
   */
  public static check(id: string): OrErrorType<UserIDTypeEnum> {
    if (id.match(EMAIL_REGEXP)) {
      return UserIDTypeEnum.Email
    } else if (id.match(PHONE_REGEXP)) {
      return UserIDTypeEnum.Phone
    }
    return new Error(`User's ID Type error: ID has to be 'phone' or 'email'`)
  }
}
