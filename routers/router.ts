import { Response, Router } from 'express';
import { ExtendedRequest } from '../interfaces/extendedRequest';
import { authMiddleware } from '../middlewares/auth';
import proposeRouter from './sessionRouter';
import userRouter from './userRouter';

const router = Router();
router.use('/', userRouter);
router.use('/interviewdashboard/dashboard', proposeRouter);

router.get(
  '/getLoggedInUser',
  authMiddleware,
  (req: ExtendedRequest, res: Response) => res.send(req.user)
);

// router.post('/interviewdashboard/dashboard', authMiddleware, propose);
// router.get

export default router;
