import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import * as projectController from "../controllers/projectController.js";

const router = express.Router();

router
  .route("/getDashboardProject")
  .get(protect, projectController.getDashboardProject);
router.route("/addProject").post(protect, projectController.addNewProject);
router.route("/updateProject").post(protect, projectController.updateProject);
router
  .route("/findById/:id")
  .get(protect, projectController.getSelectedProject);
router
  .route("/updatePublisher/:id")
  .get(protect, projectController.updatePubliser);
router
  .route("/deleteDashboardProject/:id")
  .get(protect, projectController.deleteSelectedProject);
router
  .route("/reStoreDashboardProject/:id")
  .get(protect, projectController.reStoreSelectedProject);
router.get("/client/getProjects", projectController.getClientProjects);
router.get(
  "/client/getSelectedProject/:id",
  projectController.getClientSelectedProject,
);

export default router;
