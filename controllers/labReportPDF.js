import pdf from 'html-pdf';
import { labReportTemplate } from '../Documents/labReport.js';
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const createLabReportPDF = async (req, res) => {
    const filePath = `${__dirname}/report.pdf`; 
    pdf.create(labReportTemplate(req.body), {}).toFile(filePath, (err) => {
        if (err) {
            console.log("PDF creation failed:", err);
            return res.status(500).json({ success: false, message: "PDF creation failed" });
        } else {
            console.log("PDF created successfully");
            return res.status(200).json({ success: true, message: "PDF created successfully" });
        }
    });
};


export const getLabReportPDF = async (req, res) => {
    res.sendFile(`${__dirname}/report.pdf`);
};