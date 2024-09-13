import pdf from 'html-pdf';
import { invoiceTemplate } from '../Documents/invoice.js';
import dotenv from "dotenv";
import path from 'path';
dotenv.config();

// Generate the PDF and save it
export const createInvoicePDF = async(req, res) => {
    const pdfFilePath = path.join(process.cwd(), 'result.pdf');
    pdf.create(invoiceTemplate(req.body), {}).toFile(pdfFilePath, (err) => {
        if (err) {
            return res.status(500).send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
};

// Fetch the PDF and set headers for download
export const getInvoicePDF = async(req, res) => {
    const pdfFilePath = path.join(process.cwd(), 'result.pdf');
    
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice_${req.query.invoice_id || 'result'}.pdf"`,
    });
    
    res.sendFile(pdfFilePath, (err) => {
        if (err) {
            return res.status(500).send(Promise.reject());
        }
    });
};