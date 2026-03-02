import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Worker } from "../models/worker.model.js";
import { User } from "../models/user.model.js";

// this middleware use to check if user is login or not

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.UseraccessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -UserrefreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access Token");
  }
});

const verifyWorker = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.WorkeraccessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const worker = await Worker.findById(decodedToken?._id).select(
      "-password -WorkerrefreshToken"
    );
    if (!worker) {
      throw new ApiError(401, "Invalid access Token");
    }
    req.worker = worker;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access Token");
  }
});

export { verifyJWT, verifyWorker };
