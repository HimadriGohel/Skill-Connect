import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { SubCategory } from "../models/subCategories.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const addSubcategories = async (req, res) => {
  try {
    const { category, subcategories } = req.body;

    // Validate that subcategories is an array with values
    if (!Array.isArray(subcategories) || subcategories.length === 0) {
      return res.status(400).json({
        error: "Subcategories should be a non-empty array of strings.",
      });
    }

    // Create new subCategory entry
    const newSubCategory = new SubCategory({
      category,
      subcategories,
    });

    // Save the document to the database
    const savedSubCategory = await newSubCategory.save();

    res.status(201).json({
      message: "Subcategories added successfully",
      data: savedSubCategory,
    });
  } catch (error) {
    console.error("Error adding subcategories:", error);
    res.status(500).json({ error: "Failed to add subcategories" });
  }
};

const getSubCategory = asyncHandler(async (req, res) => {
  //fetch all categories from database
  try {
    const { categoryId } = req.params;
    const subCategory = await SubCategory.findOne({ category: categoryId });
    if (!subCategory) {
      return res
        .status(404)
        .json({ error: "No subcategories found for this category" });
    }
    res.json(subCategory.subcategories); // Return only the array of subcategories
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subcategories" });
  }
});
export { addSubcategories, getSubCategory };
