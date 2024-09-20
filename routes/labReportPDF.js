import express from "express";
import { createLabReportPDF, getLabReportPDF } from "../controllers/labReportPDF.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router()


router.post("/create-lab-report-pdf", authenticateToken, createLabReportPDF);
router.get("/fetch-lab-report-pdf", authenticateToken, getLabReportPDF);

export default router;