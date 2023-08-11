import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import * as projectCategoryController from "../controllers/projectCategoryController.js";

const router = express.Router();

router
  .route("/projectCategoryList")
  .get(protect, projectCategoryController.getAllProjectCategoryList);

export default router;
