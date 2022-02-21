import {Router} from 'express';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';
import productsRouter from './productsRouter.js';
import checkoutRouter from './checkoutRouter.js';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(productsRouter);
router.use(checkoutRouter)

export default router;