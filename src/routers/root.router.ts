import { Router } from 'express';
import { userRouter } from './user.router';

export const rootRouter: Router = Router()

rootRouter.use('/api', userRouter)
