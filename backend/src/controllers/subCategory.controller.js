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
    try {
        const { categoryId } = req.params;
        const cleanId = categoryId.trim();

        // This query finds the category whether it is stored as a String OR an ObjectId
        const subCategories = await SubCategory.find({
            $or: [
                { category: cleanId },
                { category: mongoose.Types.ObjectId.isValid(cleanId) ? new mongoose.Types.ObjectId(cleanId) : null }
            ]
        });

        console.log(`Found ${subCategories.length} items for ID: ${cleanId}`);
        res.status(200).json(subCategories);
    } catch (error) {
        console.error("Query Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

 
export { addSubcategories, getSubCategory };
