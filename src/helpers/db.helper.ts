import config from 'config';
import { DataSource } from 'typeorm';

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
      throw new Error //TODO ??: Create ErrorModel;
    }

    return DbHelper._connection
  }

  /**
   * Initialize connection
   */
  public static async initialize(): Promise<void> {
    DbHelper._connection = new DataSource({
      type: 'postgres',
      dropSchema: config.get('db.dropSchema'),
      host: config.get('db.host'),
      port: config.get('db.port'),
      username: config.get('db.user'),
      password: config.get('db.password'),
      database: config.get('db.name'),
      entities: [],
      synchronize: true,
    })

    await DbHelper._connection
      .initialize()
      //.catch<never>() //TODO: Add QueryHelper
  }
}
