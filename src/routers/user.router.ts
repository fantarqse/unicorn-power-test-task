import { Router } from 'express';
import { CheckHandler } from '../handlers/check.handler';
import { InfoHandler } from '../handlers/info.handler';
import { LogoutHandler } from '../handlers/logout.handler';
import { SigninHandler } from '../handlers/signin.handler';
import { SignupHandler } from '../handlers/signup.handler';

export const userRouter: Router = Router()

userRouter.get(//TODO: Remove before prod;
  '/check',
  CheckHandler.handle,
  )

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
  SigninHandler.handle,
)

userRouter.post(
  '/signup',
  SignupHandler.handle,
)
