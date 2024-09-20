import pdf from 'html-pdf';
import { prescriptionTemplate } from '../Documents/prescription.js';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const createPrescriptionPDF = async (req, res) => {
    const filePath = `${__dirname}/prescription.pdf`; 
    pdf.create(prescriptionTemplate(req.body), {}).toFile(filePath, (err) => {
        if (err) {
            console.log("PDF creation failed:", err);
            return res.status(500).json({ success: false, message: "PDF creation failed" });
        } else {
            console.log("PDF created successfully");
            return res.status(200).json({ success: true, message: "PDF created successfully" });
        }
    });
};


export const getPrescriptionPDF = async (req, res) => {
    res.sendFile(`${__dirname}/prescription.pdf`);
};