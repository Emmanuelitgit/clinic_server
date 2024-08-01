import express from "express"
import { addInvoice, getInvoice, getInvoiceList, removeInvoice, updateInvoice, updateStatus } from "../controllers/payment.js";
import { authenticateToken } from "../middleware/authToken.js";


const router = express.Router()

router.get("/invoice_list", authenticateToken, getInvoiceList);
router.get("/invoice/:id", authenticateToken, getInvoice);
router.post("/add_invoice", authenticateToken, addInvoice);
router.put("/update_invoice/:id", authenticateToken, updateInvoice);
router.put("/update_payment_status/:id", authenticateToken, updateStatus);
router.delete("/remove_invoice/:id", authenticateToken, removeInvoice);

export default router;