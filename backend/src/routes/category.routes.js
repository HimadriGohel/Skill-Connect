import { Router } from "express";
import {
  addCategory,
  getCategory,
} from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const categoryRouter = Router();

categoryRouter.route("/addCategory").post(addCategory);
categoryRouter.route("/getCategory").get(getCategory);
export { categoryRouter };
