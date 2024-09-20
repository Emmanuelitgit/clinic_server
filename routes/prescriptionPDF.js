import express from "express";
import { createPrescriptionPDF, getPrescriptionPDF } from "../controllers/prescriptionPDF.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router()


router.post("/create-prescription-pdf", authenticateToken, createPrescriptionPDF);
router.get("/fetch-prescription-pdf", authenticateToken, getPrescriptionPDF);

export default router;