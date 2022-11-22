import { UserModel } from '../models/entities/user.model'

export type UserClientType = Omit<UserModel, 'password'>
