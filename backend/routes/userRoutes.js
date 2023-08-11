import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.route("/profile").get(protect, userController.getUserProfile);
router.route("/getAllUsers").get(protect, userController.getAllUser);
router.route("/activeAdminUser").post(protect, userController.updateUserStatus);

export default router;
