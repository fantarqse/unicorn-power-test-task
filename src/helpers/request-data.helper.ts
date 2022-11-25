import { OrErrorType } from '../types/or-error.type'
import { MaybeType } from '../types/maybe.type'
import { QueryParamsType } from '../types/query-params.type'

export class RequestDataHelper {
  /**
   * Parses a token
   */
  public static checkToken(token: MaybeType<string>): OrErrorType<string> {
    if(!token) {
      return new Error(`Token is not found`)
    }
    return token.split(' ')[1]
  }

  /**
   * Parses query params
   */
  public static checkQueryParams(params: MaybeType<QueryParamsType>): OrErrorType<boolean> {
    switch (params) {
      case 'true':
        return  true
      case 'false':
        return  false
      default:
        return new Error(`Query params have to be 'true' or 'false'`)
    }
  }
}