import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import * as appNewsController from "../controllers/appNewsController.js";

const router = express.Router();

router.route("/addNews").post(protect, appNewsController.addNews);
router.route("/getNewsList").get(protect, appNewsController.getAllNews);
router.route("/updateNews").post(protect, appNewsController.updateNews);
router
  .route("/deleteSelectedNews/:id")
  .get(protect, appNewsController.deleteNewsById);
router.get("/client/getNews", appNewsController.getAllNews);

export default router;
