import * as uuid from 'uuid'
import { NOTHING } from '../consts/nothing.const'
import { NothingType } from '../types/nothing.type'

export class DataHelper {
  /**
   * Returns undefined
   */
  public static returnNothing(): NothingType {
    return NOTHING
  }

  /**
   * Method creates a UUID
   */
  public static createUUID(): string {
    return uuid.v4()
  }

  /**
   * Simply returns value as given type
   */
  public static cast<T>(data: any): T {
    return data as T
  }
}
