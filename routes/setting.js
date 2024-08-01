import express from "express";
import { getSettingList, updateSetting } from "../controllers/setting.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router()


router.get("/settings", authenticateToken, getSettingList);
router.put("/update_setting/:id", authenticateToken, updateSetting);

export default router;