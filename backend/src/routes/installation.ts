import express from "express";
import {
  // addEnv,
  addConfigData,
  updateEnvData,
  checkConfig,
  completeInstallation,
} from "../controllers/installationController";
import { addEnvToVercel } from "../installattion/installationFunctions";

const router = express.Router();

// router.post("/add-env", addEnv);
router.post("/add-config", addConfigData);
router.post("/add-env", updateEnvData);
// router.post("/post-env", postEnvFileToVercel);
router.get("/check-config", checkConfig);
router.post("/finish-installation", completeInstallation);
router.get("/", (req, res) => {
  res.send("working");
});

export default router;
