import express from "express"
import { addReport, getReport, getReports, removeReport, updateReport, getAllReports } from "../controllers/report.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router()

router.get("/reports/:type", authenticateToken, getReports);
router.get("/reports", authenticateToken, getAllReports);
router.get("/report/:id", authenticateToken, getReport);
router.post("/add_report", authenticateToken, addReport);
router.put("/update_report/:id", authenticateToken, updateReport);
router.delete("/remove_report/:id", authenticateToken, removeReport);

export default router;