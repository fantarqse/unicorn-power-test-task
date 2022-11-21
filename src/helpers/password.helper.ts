import bcrypt from 'bcrypt'

export class PasswordHelper {
  /**
   * Hashing a raw password
   */
  public static async hash(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10)
    } catch (error) {
      throw new Error(`Hash operation failed: ${error.message}`)
    }
  }

  /**
   * Compare a user's password with DB's password
   */
  public static async verify(userPassword: string, dbUserPassword: string): Promise<boolean> {
    try {
      return bcrypt.compare(userPassword, dbUserPassword)
    } catch (error) {
      throw new Error(`Verify operation failed: ${error.message}`)
    }
  }
}
