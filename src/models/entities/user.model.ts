import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserIDTypeEnum } from '../../enums/user-id-type.enum';

@Entity({ name: UserModel.tableName })
export class UserModel {
  /**
   * Table name
   */
  public static tableName: string = 'user'

  /**
   * DB's real fields names
   */
  public static readonly id: string = 'id'
  public static readonly userID: string = 'user_id'
  public static readonly userIDType: string = 'user_id_type'
  public static readonly password: string = 'password'

  /**
   * ID (PRIMARY KEY)
   */
  @PrimaryColumn({
    name: UserModel.id,
    type: 'uuid',
    generated: 'uuid'
  })
  public readonly id: string

  /**
   * User's login: phone number or email
   */
  @Column({
    name: UserModel.userID,
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true
  })
  public readonly userID: string

  /**
   * User's login's type
   */
  @Column({
    name: UserModel.userIDType,
    type: 'varchar',
    length: 30,
    nullable: false
  })
  public readonly userIDType: UserIDTypeEnum

  /**
   * Hashed user's password
   */
  @Column({
    name: UserModel.password,
    type: 'varchar',
    length: 60,
    nullable: false
  })
  public readonly password: string

  public constructor(params: UserModel) {
    if (params) { // Need 'if' for correct ORM work
      this.id = params.id
      this.userID = params.userID
      this.userIDType = params.userIDType
      this.password = params.password
    }
  }
}
