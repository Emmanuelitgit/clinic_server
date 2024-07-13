import express from "express"
import { addInvoice, getInvoice, getInvoiceList, removeInvoice, updateInvoice, updateStatus } from "../controllers/payment.js";


const router = express.Router()

router.get("/invoice_list", getInvoiceList);
router.get("/invoice/:id", getInvoice);
router.post("/add_invoice", addInvoice);
router.put("/update_invoice/:id", updateInvoice);
router.put("/update_payment_status/:id", updateStatus);
router.delete("/remove_invoice/:id", removeInvoice);

export default router;