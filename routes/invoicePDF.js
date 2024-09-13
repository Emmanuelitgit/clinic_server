import express from "express";
import { createInvoicePDF, getInvoicePDF } from "../controllers/invoicePDF.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router()


router.post("/create-invoice-pdf", authenticateToken, createInvoicePDF);
router.get("/fetch-invoice-pdf", authenticateToken, getInvoicePDF);

export default router;