import { Router } from "express";
import {
  addSubcategories,
  getSubCategory,
} from "../controllers/subCategory.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const subCategoryRouter = Router();

subCategoryRouter.route("/addSubCategory").post(addSubcategories);
subCategoryRouter.route("/getSubCategories/:categoryId").get(getSubCategory);

export { subCategoryRouter };
