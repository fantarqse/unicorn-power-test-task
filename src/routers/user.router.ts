import { Router } from 'express'
import { CheckHandler } from '../handlers/check.handler'
import { InfoHandler } from '../handlers/info.handler'
import { LogoutHandler } from '../handlers/logout.handler'
import { LoginHandler } from '../handlers/login.handler'
import { RegistrationHandler } from '../handlers/registration.handler'

export const userRouter: Router = Router()

userRouter.get(
  '/info',
  InfoHandler.handle,
)

userRouter.get(
  '/logout',
  LogoutHandler.handle,
)

userRouter.post(
  '/signin',
  LoginHandler.handle,
)

userRouter.post(
  '/signup',
  RegistrationHandler.handle,
)
