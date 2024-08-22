import { Router } from "express";

import {
  getAllProposedSession,
  getSessionByDate,
  propose,
} from "../controllers/proposeController";
import { authMiddleware } from "../middlewares/auth";

const proposeRouter = Router();
proposeRouter.post("/createSession", authMiddleware, propose);
proposeRouter.get(
  "/getAllProposeSession",
  authMiddleware,
  getAllProposedSession
);
proposeRouter.post("/getSessionByDate", authMiddleware, getSessionByDate);

export default proposeRouter;
