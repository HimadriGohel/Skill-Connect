import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Worker } from "../models/worker.model.js";
import {
  // deleteOldAvatarImage,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (workerId) => {
  try {
    const worker = await Worker.findById(workerId);
    const WorkeraccessToken = worker.generateAccessToken();
    const WorkerrefreshToken = worker.generateRefreshToken();
    worker.WorkerrefreshToken = WorkerrefreshToken;
    await worker.save({ validateBeforeSave: false });

    return { WorkeraccessToken, WorkerrefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerWorker = asyncHandler(async (req, res) => {
  const {
    category,
    subCategory,
    desiredPeriod,
    hourlyPay,
    workerDetails,
    firstName,
    lastName,
    phone,
    email,
    aadhar,
    password,
    workExperience,
    postalCode,
    city,
    address,
  } = req.body;

  //validation - non empty
  if (firstName === "") {
    throw new ApiError(400, "fullname is required");
  }
  if (email === "") {
    throw new ApiError(400, "email is required");
  }
  if (lastName === "") {
    throw new ApiError(400, "username is required");
  }
  if (password === "") {
    throw new ApiError(400, "password is required");
  }

  //check if user already exist email
  const existedworker = await Worker.findOne({ email });

  if (existedworker) {
    throw new ApiError(409, "worker with email is already exist");
  }

  //check for images
  const filelocalpath = req.file?.path;

  //upload them to cloudinary
  const file = await uploadOnCloudinary(filelocalpath);

  //create user object - create entry in db
  const worker = await Worker.create({
    category,
    subCategory,
    desiredPeriod,
    hourlyPay,
    workerDetails,
    file: file.url,
    firstName,
    lastName,
    phone,
    email,
    aadhar,
    password,
    workExperience,
    postalCode,
    city,
    address,
  });

  //remove password and refresh token field from response
  const createdWorker = await Worker.findById(worker._id).select(
    "-password -refreshToken"
  );

  //check for user creation
  if (!createdWorker) {
    throw new ApiError(500, "something went wrong while registring the worker");
  }

  //return res
  return res
    .status(201)
    .json(
      new ApiResponse(200, createdWorker, "Worker registered Successfully")
    );
});

const loginWorker = asyncHandler(async (req, res) => {
  // get user data from frontend
  //username and email
  //check for user is exist or not
  //if user is not exist then throw error
  //if user exist then check password
  //if user exist then generate access and refresh token
  //send cookie
  //send success responce

  // get user data from frontend
  const { email, password } = req.body;

  //username and email
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  //check for worker is exist or not
  const worker = await Worker.findOne({ email });

  if (!worker) {
    throw new ApiError(404, "worker does not exist with this email");
  }

  //if worker exist then check password
  const isPasswordValid = await worker.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid worker credentials");
  }

  //if user exist then generate access and refresh token
  const { WorkeraccessToken, WorkerrefreshToken } =
    await generateAccessAndRefreshTokens(worker._id);

  const loggedInWorker = await Worker.findById(worker._id).select(
    "-password -WorkerrefreshToken"
  );

  //send cookie
  //this options field is for extra security , it is not mandatory but it is highly recomended in production for security purpose
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("WorkeraccessToken", WorkeraccessToken, options)
    .cookie("WorkerrefreshToken", WorkerrefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          worker: loggedInWorker,
          WorkeraccessToken,
          WorkerrefreshToken,
        },
        "Worker logged In Successfully"
      )
    );
});
const getWorkerDetails = asyncHandler(async (req, res) => {
  // get user data from frontend

  const worker = await Worker.findById(req.worker.id);
  // const worker = await Worker.findById(req.body.id);
  if (!worker) {
    throw new ApiError(404, "worker does not exist with this email");
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        worker: worker,
      },
      "Worker fetched Successfully"
    )
  );
});

const logoutWorker = asyncHandler(async (req, res) => {
  await Worker.findByIdAndUpdate(
    req.worker.id,
    {
      $unset: {
        WorkerrefreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("WorkeraccessToken", options)
    .clearCookie("WorkerrefreshToken", options)
    .json(new ApiResponse(200, {}, "Worker logged Out"));
});

const isloggedIn = asyncHandler(async (req, res) => {
  const token = req.cookies.WorkeraccessToken;
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

const editWorkerDetails = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    workerDetails,
    aadhar,
    address,
    desiredPeriod,
    hourlyPay,
    postalCode,
    city,
  } = req.body;

  const worker = await Worker.findByIdAndUpdate(
    req.worker?._id,
    {
      $set: {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        aadhar: aadhar,
        address: address,
        desiredPeriod: desiredPeriod,
        hourlyPay: hourlyPay,
        postalCode: postalCode,
        city: city,
        workerDetails: workerDetails,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, worker, "Account details updated successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  // if (newPassword !== confirmPassword) {
  //   throw new ApiError(400, "password and confirmPassword is not matching");
  // }
  const worker = await Worker.findById(req.worker?._id);
  console.log(worker);
  console.log(oldPassword);
  const isPasswordCorrect = await worker.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Old password");
  }
  worker.password = newPassword;
  await worker.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .clearCookie("WorkeraccessToken", options)
    .clearCookie("WorkerrefreshToken", options);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Details changed successfully please login again"
      )
    );
});

const fetchRequests = asyncHandler(async (req, res) => {
  const worker = await Worker.findById(req.worker?._id)
    .populate({
      path: "requests.user",
      select: "fullName email phone address requests",
    })
    .select("-password");

  const requests = worker.requests;

  return res
    .status(200)
    .json(new ApiResponse(200, requests, "requests fetched successfully"));
});

const getWorkers = asyncHandler(async (req, res) => {
  const worker = await Worker.find();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        worker: worker,
      },
      "Worker fetched Successfully"
    )
  );
});

const getWorkerDetailsById = asyncHandler(async (req, res) => {
  // get user data from frontend

  const workerId = req.params.id; // Get worker ID from route parameters

  // Validate workerId before querying
  if (!workerId || !workerId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid worker ID format",
    });
  }
  const worker = await Worker.findById(workerId);

  if (!worker) {
    throw new ApiError(404, "worker does not exist with this email");
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        worker: worker,
      },
      "Worker fetched Successfully"
    )
  );
});

const getFilteredWorkers = asyncHandler(async (req, res) => {
  const { category, city, hourlyPay } = req.query;

  let filter = {};

  if (category) {
    const categoryArray = category.split(","); // Convert string to array
    filter.category = { $in: categoryArray }; // Use $in to match any category
  }

  // Handle multiple cities
  if (city) {
    const cityArray = city.split(","); // Convert string to array
    filter.city = { $in: cityArray }; // Use $in to match any city
  }

  if (hourlyPay) {
  const hourlyPayArray = hourlyPay.split(","); // convert to array
  const hourlyPayFilters = [];

  hourlyPayArray.forEach((pay) => {

    if (pay === "500") {
      hourlyPayFilters.push({ hourlyPay: { $lte: 500 } });
    } 
    else if (pay === "1000") {
      hourlyPayFilters.push({ hourlyPay: { $lte: 1000 } });
    } 
    else if (pay === "Above1000") {
      hourlyPayFilters.push({ hourlyPay: { $gt: 1000 } });
    } 

   if (!isNaN(pay)) {
  hourlyPayFilters.push({ hourlyPay: Number(pay) });
}
  });

  if (hourlyPayFilters.length > 0) {
    filter.$or = hourlyPayFilters;
  }
}

 const workers = await Worker.find(filter);

  res.status(200).json(
    new ApiResponse(200, {
      workers,
    })
  );
});

const resetWorkerPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and new password are required");
  }

  const worker = await Worker.findOne({ email });

  if (!worker) {
    throw new ApiError(404, "Worker not found");
  }

  worker.password = password;
  await worker.save({ validateBeforeSave: false });

  return res.status(200).json(
    new ApiResponse(200, {}, "Password reset successfully")
  );
});

// //when accesstoken expires frontend makes api request to create new accesstoken
// const refreshAccessToken = asyncHandler(async (req, res) => {
//   // first extract the refreshtoken of user from cookies
//   const incomingRefreshToken =
//     req.cookies.refreshToken || req.body.refreshToken;

//   if (!incomingRefreshToken) {
//     throw new ApiError(401, "unauthorized request");
//   }

//   //verify refresh token
//   try {
//     const decodedToken = jwt.verify(
//       incomingRefreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );

//     const user = await User.findById(decodedToken?._id);

//     if (!user) {
//       throw new ApiError(401, "Invalid refresh token");
//     }
//     if (incomingRefreshToken !== user?.refreshToken) {
//       throw new ApiError(401, "Refresh token is expired or used");
//     }
//     const options = {
//       httpOnly: true,
//       secure: true,
//     };
//     const { accessToken, newRefreshToken } =
//       await generateAccessAndRefreshTokens(user._id);

//     return res
//       .status(200)
//       .cookie("accessToken", tokens.accessToken, options)
//       .cookie("refreshToken", tokens.newRefreshToken, options)
//       .json(
//         new ApiResponse(
//           200,
//           {
//             accessToken,
//             refreshToken: newRefreshToken,
//           },
//           "Access token refreshed"
//         )
//       );
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid refresh token");
//   }
// });

// const getCurrentUser = asyncHandler(async (req, res) => {
//   return res
//     .status(200)
//     .json(new ApiResponse(200, req.user, "current user fetched successfully"));
// });

// const updateUserAvatar = asyncHandler(async (req, res) => {
//   const avatarLocalPath = req.file?.path;

//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar file is missing");
//   }
//   const avatar = await uploadOnCloudinary(avatarLocalPath);

//   if (!avatar.url) {
//     throw new ApiError(400, "Error while uploading the avatar");
//   }
//   const user = await User.findByIdAndUpdate(
//     req.user?._id,
//     {
//       $set: {
//         avatar: avatar.url,
//       },
//     },
//     { new: true }
//   ).select("-password");

//   //delete old image from cloudinary
//   const deleteImage = await deleteOldAvatarImage(req.user?._id);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Avatar image updated successfully"));
// });

// const updateUserCoverImage = asyncHandler(async (req, res) => {
//   const coverImageLocalPath = req.file?.path;

//   if (!coverImageLocalPath) {
//     throw new ApiError(400, "CoveImage file is missing");
//   }
//   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

//   if (!coverImage.url) {
//     throw new ApiError(400, "Error while uploading the coverImage");
//   }
//   const user = await User.findByIdAndUpdate(
//     req.user?._id,
//     {
//       $set: {
//         coverImage: coverImage.url,
//       },
//     },
//     { new: true }
//   ).select("-password");

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Cover image updated successfully"));
// });

// const getUserChannelProfiles = asyncHandler(async (req, res) => {
//   const { username } = req.params;
//   if (!username?.trim()) {
//     throw new ApiError(400, "username is missing");
//   }
//   const channel = await User.aggregate([
//     {
//       $match: {
//         username: username?.toLowerCase(),
//       },
//     },
//     //its find how many people subscribe us
//     // for example if we want to know that how many people subscribe mrbeast then instead of counting one by one user we just select mrbeast channel from document and then simply count the resulted data
//     {
//       $lookup: {
//         from: "subscriptions",
//         localField: "_id",
//         foreignField: "channel",
//         as: "subscribers",
//       },
//     },
//     //its find to how many people i subscribed
//     // for example if we want to know that to the how many people mrbeast subscribe then instead of check all documents we just select name mrbeast and then count the resulted data
//     {
//       $lookup: {
//         from: "subscriptions",
//         localField: "_id",
//         foreignField: "subscriber",
//         as: "subscriberTo",
//       },
//     },
//     {
//       $addFields: {
//         subscribersCount: {
//           $size: "$subscribers",
//         },
//         channelSubscribedToCount: {
//           $size: "$subscriberTo",
//         },
//         isSubscribed: {
//           $cond: {
//             if: { $in: [req.user?._id, "$subscribers.subscriber"] },
//             then: true,
//             else: false,
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         fullname: 1,
//         username: 1,
//         subscribersCount: 1,
//         channelSubscribedToCount: 1,
//         isSubscribed: 1,
//         avatar: 1,
//         coverImage: 1,
//         email: 1,
//       },
//     },
//   ]);
//   if (!channel?.length) {
//     throw new ApiError(404, "channel does not exists");
//   }
//   return res
//     .status(200)
//     .json(
//       new ApiResponse(200, channel[0], "User channel fetched successfully")
//     );
// });

// const getWatchHistory = asyncHandler(async (req, res) => {
//   const user = await User.aggregate([
//     {
//       $match: {
//         _id: new mongoose.Types.ObjectId(req.user._id),
//       },
//     },
//     {
//       $lookup: {
//         from: "videos",
//         localField: "watchHistory",
//         foreignField: "_id",
//         as: "watchHistory",
//         pipeline: [
//           {
//             $lookup: {
//               from: "users",
//               localField: "owner",
//               foreignField: " _id",
//               as: "owner",
//               pipeline: [
//                 {
//                   $project: {
//                     fullname: 1,
//                     username: 1,
//                     avatar: 1,
//                   },
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     },
//   ]);

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         user[0].watchHistory,
//         "watch history fetched successfully"
//       )
//     );
// });

export {
  registerWorker,
  loginWorker,
  getWorkerDetails,
  logoutWorker,
  isloggedIn,
  editWorkerDetails,
  changeCurrentPassword,
  fetchRequests,
  getWorkers,
  getWorkerDetailsById,
  getFilteredWorkers,
  resetWorkerPassword,
  // refreshAccessToken,
  // getCurrentUser,
  // updateUserAvatar,
  // updateUserCoverImage,
  // getUserChannelProfiles,
  // getWatchHistory,
};