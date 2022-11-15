import { HttpStatusEnum } from '../enums/http-status.enum';
import { MaybeType } from '../types/maybe.type';

export class ErrorModel {
  /**
   * Description of error
   */
  public readonly description: string

  /**
   * Original Error
   */
  public readonly error?: MaybeType<Error>

  /**
   * Http status to return to client
   */
  public readonly httpStatus?: MaybeType<HttpStatusEnum>

  public constructor(params: ErrorModel) {
    this.description = params.description
    this.error = params.error
    this.httpStatus = params.httpStatus
  }
}
