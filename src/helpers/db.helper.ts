import config from 'config'
import { DataSource } from 'typeorm'
import { TokenModel } from '../models/entities/token.model'
import { UserModel } from '../models/entities/user.model'
import { AsyncVoidType } from '../types/async-void.type'

export class DbHelper {
  /**
   * Single connection instance
   */
  private static _connection: DataSource

  /**
   * Returns single instance of connection
   */
  public static getConnection(): DataSource {
    if (!DbHelper._connection) {
      throw new Error(`DB's connection was not initialized`)
    }

    return DbHelper._connection
  }

  /**
   * Initialize connection
   */
  public static async initialize(): AsyncVoidType {
    DbHelper._connection = new DataSource({
      type: 'postgres',
      dropSchema: config.get('db.dropSchema'),
      host: config.get('db.host'),
      port: config.get('db.port'),
      username: config.get('db.user'),
      password: config.get('db.password'),
      database: config.get('db.name'),
      entities: [UserModel, TokenModel],
      synchronize: true,
    })

    await DbHelper._connection
      .initialize()
  }
}
