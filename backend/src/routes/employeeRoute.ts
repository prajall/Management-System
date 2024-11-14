import express from "express";
import { authChecker } from "../middlewares/authChecker";
import { adminChecker, checkPermission } from "../middlewares/checkPermission";
import { createEmployee } from "../controllers/employeeController";
import { upload } from "../cloudinary";

const router = express.Router();

router.post(
  "/",
  authChecker,
  adminChecker,
  upload.single("profileImage"),
  createEmployee
);

export default router;
