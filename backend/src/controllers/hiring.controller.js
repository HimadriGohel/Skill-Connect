import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Worker } from "../models/worker.model.js";
import { User } from "../models/user.model.js";

// Endpoint to hire a worker
const hireWorker = asyncHandler(async (req, res) => {
  try {
    //ahiya body ne badle bije thi levi jose
    const { workerId, userId } = req.body;
    // const userId = req.user;

    // Validate input
    if (!userId || !workerId) {
      return res
        .status(400)
        .json(new ApiError(400, "user and worker id is required"));
    }

    // Find user and worker
    const user = await User.findById(userId);
    const worker = await Worker.findById(workerId);

    if (!user || !worker) {
      return res
        .status(404)
        .json(new ApiError(404, "user and worker not found"));
    }

    // Update user's hiring history
    user.hiringHistory.push({ worker: workerId });
    await user.save();

    // Update worker's request history
    worker.requests.push({ user: userId });
    await worker.save();

    res.status(200).json(new ApiResponse(200, {}, "Worker hired successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Internal server error"));
  }
});

const updateHireRequest = asyncHandler(async (req, res) => {
  const { userId, status } = req.body; // Status should be 'accepted' or 'rejected'
  const workerId = req.worker;
  if (!["accepted", "rejected", "completed"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  const worker = await Worker.findById(workerId);
  const user = await User.findById(userId);

  if (!worker || !user) {
    return res
      .status(404)
      .json({ success: false, message: "Worker or User not found" });
  }

  // Update Worker Database using `findOneAndUpdate`
  const updatedWorker = await Worker.findOneAndUpdate(
    { _id: workerId, "requests.user": userId }, // Find worker with matching userId in requests
    { $set: { "requests.$.status": status } }, // Update status in requests array
    { new: true } // Return the updated document
  );

  if (!updatedWorker) {
    return res
      .status(404)
      .json({ success: false, message: "Worker request not found" });
  }

  // Update User Database
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, "hiringHistory.worker": workerId }, // Find the document with matching userId and workerId in hiringHistory
    { $set: { "hiringHistory.$.status": status } }, // Update the status inside hiringHistory array
    { new: true } // Return the updated document
  );

  if (!updatedUser) {
    return res
      .status(404)
      .json({ success: false, message: "Hire request not found" });
  }
  res
    .status(200)
    .json({ success: true, message: `Hire request ${status} successfully` });
});

export { hireWorker, updateHireRequest };
