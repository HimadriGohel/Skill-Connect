import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const WorkerSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      default: "general",
    },
    desiredPeriod: {
      type: String,
      required: true,
    },
    hourlyPay: {
      type: Number,
      required: true,
    },
    workerDetails: {
      type: String,
    },
    file: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    aadhar: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    workExperience: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    requests: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected", "completed"],
          default: "pending",
        },
        requestDate: {
          type: Date,
          default: () => new Date().setHours(0, 0, 0, 0), // Stores only the date
        },
      },
    ],
  },
  { timestamps: true }
);

WorkerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

WorkerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

WorkerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
WorkerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const Worker = mongoose.model("Worker", WorkerSchema);
