import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    subcategories: [
      {
        type: String,
        required: true,
        unique: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
