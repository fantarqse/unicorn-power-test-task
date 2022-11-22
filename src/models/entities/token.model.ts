import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { UserModel } from './user.model'

@Entity({ name: TokenModel.tableName })
export class TokenModel {
  /**
   * Table's name
   */
  public static tableName: string = 'tokens'

  /**
   * DB's real fields names
   */
  public static readonly token: string = 'token'
  public static readonly userID: string = 'user_id'
  public static readonly expirationTime: string = 'expiration_time'

  /**
   * Token (PRIMARY KEY)
   */
  @PrimaryColumn({
    name: TokenModel.token,
    type: 'uuid',
    generated: 'uuid'
  })
  public readonly token: string

  /**
   * User's ID
   */
  @OneToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: TokenModel.userID })
  public readonly userID: string

  /**
   * Expiration Time
   */
  @Column({
    name: TokenModel.expirationTime,
    type: 'timestamptz',
    nullable: false,
  })
  public readonly expirationTime: Date

  public constructor(params: TokenModel) {
    if (params) {
      this.token = params.token
      this.userID = params.userID
      this.expirationTime = params.expirationTime
    }
  }
}
