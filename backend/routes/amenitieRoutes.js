import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import * as amenitiesController from "../controllers/amenitieController.js";

const router = express.Router();

router
  .route("/addAndUpdateAmenities")
  .post(protect, amenitiesController.addAndUpdateAmenities);
router
  .route("/getAmenitiesById/:id")
  .get(protect, amenitiesController.getAmenitiesById);

export default router;
