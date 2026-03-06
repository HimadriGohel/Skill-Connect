import { Router } from "express";
import {
  hireWorker,
  updateHireRequest,
} from "../controllers/hiring.controller.js";
import { verifyJWT, verifyWorker } from "../middlewares/auth.middleware.js";

const hiringRouter = Router();

hiringRouter.route("/hireWorker").post(hireWorker);
hiringRouter.route("/updateHireRequest").post(verifyWorker, updateHireRequest);

export { hiringRouter };
