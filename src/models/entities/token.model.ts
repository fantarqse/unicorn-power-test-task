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
  public static readonly id: string = 'id'
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
  @JoinColumn({ name: TokenModel.id })
  public readonly id: string

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
    if (params) { // Need 'if' for correct ORM work
      this.token = params.token
      this.id = params.id
      this.expirationTime = params.expirationTime
    }
  }
}
