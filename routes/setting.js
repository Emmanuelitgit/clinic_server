import express from "express";
import { getSettingList, updateSetting } from "../controllers/setting.js";

const router = express.Router()


router.get("/settings", getSettingList);
router.put("/update_setting/:id", updateSetting);

export default router;