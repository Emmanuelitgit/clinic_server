import pdf from 'html-pdf';
import {invoiceTemplate} from '../Documents/invoice.js';
import dotenv from "dotenv";
dotenv.config();

export const createInvoicePDF = async(req, res) => {
    pdf.create(invoiceTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            res.status(500).send(Promise.reject());
        } else {
            res.send(Promise.resolve());
        }
    });
};

export const getInvoicePDF = async(req, res) => {
    res.sendFile(`${process.cwd()}/invoice.pdf`);
};
