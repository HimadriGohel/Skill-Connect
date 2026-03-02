import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const UseraccessToken = user.generateAccessToken();
    const UserrefreshToken = user.generateRefreshToken();
    user.UserrefreshToken = UserrefreshToken;
    await user.save({ validateBeforeSave: false });

    return { UseraccessToken, UserrefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, phone, address, password } = req.body;
  console.log(fullName);
  console.log(phone);
  //validation - non empty
  if (fullName === "") {
    throw new ApiError(400, "fullname is required");
  }
  if (email === "") {
    throw new ApiError(400, "email is required");
  }
  if (phone === "") {
    throw new ApiError(400, "phone is required");
  }
  if (password === "") {
    throw new ApiError(400, "password is required");
  }
  if (address === "") {
    throw new ApiError(400, "address is required");
  }

  //check if user already exist email
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "user with email is already exist");
  }

  //create user object - create entry in db
  const user = await User.create({
    fullName,
    email,
    phone,
    address,
    password,
  });

  //remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //check for user creation
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registring the user");
  }

  //return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user data from frontend
  const { email, password } = req.body;

  //username and email
  if (!email) {
    throw new ApiError(400, "Email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  //check for user is exist or not
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "user does not exist with this email");
  }

  //if user exist then check password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  //if user exist then generate access and refresh token
  const { UseraccessToken, UserrefreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -UserrefreshToken"
  );

  //send cookie
  //this options field is for extra security , it is not mandatory but it is highly recomended in production for security purpose
  const options = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(200)
    .cookie("UseraccessToken", UseraccessToken, options)
    .cookie("UserrefreshToken", UserrefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          UseraccessToken,
          UserrefreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        UserrefreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
  };
  return res
    .status(200)
    .clearCookie("UseraccessToken", options)
    .clearCookie("UserrefreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  // const worker = await Worker.findById(req.body.id);
  if (!user) {
    throw new ApiError(404, "user does not exist with this email");
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: user,
      },
      "user fetched Successfully"
    )
  );
});

const editUserData = asyncHandler(async (req, res) => {
  const { fullName, phone, email, address } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const isUserloggedIn = asyncHandler(async (req, res) => {
  const token = req.cookies.UseraccessToken;
  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ loggedIn: true, user: decoded });
  } catch (error) {
    res.status(401).json({ loggedIn: false });
  }
});

const fetchUserHiringHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id)
    .populate({
      path: "hiringHistory.worker",
      select: "firstName lastName category subCategory",
    })
    .select("-password");
  const history = user.hiringHistory;

  return res
    .status(200)
    .json(
      new ApiResponse(200, history, "history details fetched successfully")
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
  editUserData,
  isUserloggedIn,
  fetchUserHiringHistory,
};
