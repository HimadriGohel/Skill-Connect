import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  editUserData,
  getUserData,
  isUserloggedIn,
  fetchUserHiringHistory,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/registerUser").post(registerUser);
userRouter.route("/loginUser").post(loginUser);
userRouter.route("/logoutUser").post(verifyJWT, logoutUser);
userRouter.route("/getUserData").get(verifyJWT, getUserData);
userRouter.route("/editUserData").post(verifyJWT, editUserData);
userRouter.route("/checkUserLogin").get(isUserloggedIn);
userRouter.route("/fetchHistory").get(verifyJWT, fetchUserHiringHistory);

export { userRouter };
  