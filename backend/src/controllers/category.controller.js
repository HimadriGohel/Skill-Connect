import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/categories.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const addCategory = asyncHandler(async (req, res) => {
  //get data from body in admin panel
  //add category in db

  //here till admin panel is not available therefore i add category like below instead of fetch from body
  const categories = await Category.insertMany([
    { category: "Cleaning" },
    { category: "Construction & Renovation" },
    { category: "Kitchen & Bathroom" },
    { category: "Carpentry" },
    { category: "Automobiles" },
    { category: "Doors & Windows service" },
    { category: "Electricity" },
    { category: "Security" },
    { category: "Interior design" },
    { category: "Roofing & Exterior painting" },
  ]);

  if (!categories || categories.length === 0) {
    throw new ApiError(
      500,
      "Something went wrong while creating the categories"
    );
  }

  //return res
  return res
    .status(201)
    .json(new ApiResponse(200, categories, "category created Successfully"));
});

const getCategory = asyncHandler(async (req, res) => {
  //fetch all categories from database

  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(new ApiError(500, "Error fetching categories"));
  }
});
export { addCategory, getCategory };
