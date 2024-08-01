import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const db_name = process.env.DB_DBNAME

export const getInvoiceList = async (req, res) => {
    const query = `
        SELECT 
            ${db_name}.patient.name AS patient_name,
            ${db_name}.staff.name AS accountant_name,
            date, invoice_id, status, amount, title, transaction_id, description, method,
            ${db_name}.patient.patient_id
        FROM ${db_name}.invoice 
        JOIN ${db_name}.staff 
            ON ${db_name}.staff.staff_id = ${db_name}.invoice.accountant_id
        JOIN ${db_name}.patient 
            ON ${db_name}.patient.patient_id = ${db_name}.invoice.patient_id
    `;

    try {
        const [data] = await db.query(query);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Internal server error");
    }
}

export const getInvoice = async (req, res) => {
    const query = `
        SELECT 
            ${db_name}.patient.name AS patient_name,
            ${db_name}.staff.name AS accountant_name,
            date, invoice_id, status, amount, title, transaction_id, description, method
        FROM ${db_name}.invoice 
        JOIN ${db_name}.staff 
            ON ${db_name}.staff.staff_id = ${db_name}.invoice.accountant_id
        JOIN ${db_name}.patient 
            ON ${db_name}.patient.patient_id = ${db_name}.invoice.patient_id
        WHERE ${db_name}.patient.patient_id = ?
    `;

    try {
        const [data] = await db.query(query, [req.params.id]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Internal server error");
    }
}

export const addInvoice = async (req, res) => {
    const values = [
        req.body.title,
        req.body.amount,
        req.body.patient_id,
        req.body.accountant_id,
        req.body.date,
        req.body.status,
        req.body.transaction_id,
        req.body.description
    ];
    const query = "INSERT INTO invoice(`title`, `amount`, `patient_id`, `accountant_id`, `date`, `status`, `transaction_id`, `description`) VALUES(?)";

    try {
        await db.query(query, [values]);
        res.status(201).json('Invoice added');
    } catch (err) {
        res.status(500).json("Internal server error");
    }
}

export const updateInvoice = async (req, res) => {
    const values = [
        req.body.title,
        req.body.amount,
        req.body.patient_id,
        req.body.accountant_id,
        req.body.date,
        req.body.status,
        req.body.description
    ];
    const updateId = req.params.id;
    const query = "UPDATE invoice SET title=?, amount=?, patient_id=?, accountant_id=?, date=?, status=?, description=? WHERE invoice_id=?";

    try {
        await db.query(query, [...values, updateId]);
        res.status(201).json('Invoice updated');
    } catch (err) {
        res.status(500).json("Internal server error");
    }
}

export const updateStatus = async (req, res) => {
    const values = [req.body.status];
    const updateId = req.params.id;
    const query = "UPDATE invoice SET status=? WHERE invoice_id=?";

    try {
        await db.query(query, [...values, updateId]);
        res.status(201).json('Status updated');
    } catch (err) {
        res.status(500).json("Internal server error");
    }
}

export const removeInvoice = async (req, res) => {
    const query = "DELETE FROM invoice WHERE invoice_id = ?";
    const invoiceId = req.params.id;

    try {
        await db.query(query, [invoiceId]);
        res.status(200).json('Invoice removed');
    } catch (err) {
        res.status(500).json("Internal server error");
    }
}


// import db from "../db.js";



// export const getInvoiceList = async(req, res) =>{

// const query = `
// SELECT 
//    clinic_management_system.patient.name AS patient_name,
//    clinic_management_system.staff.name AS accountant_name,
//    date, invoice_id, status, amount, title, transaction_id, description, method,
//    Clinic_management_system.patient.patient_id
//    FROM clinic_management_system.invoice 
//    JOIN clinic_management_system.staff 
//    ON Clinic_management_system.staff.staff_id = clinic_management_system.invoice.accountant_id
//    JOIN clinic_management_system.patient 
//    ON Clinic_management_system.patient.patient_id = clinic_management_system.invoice.patient_id`;
  
//     db.query(query, (err, data)=>{
//         if(err) return res.status(500).json("Internal server error");

//         return res.status(200).json((data))
//     })
// }

// export const getInvoice = (req, res) =>{

//     const query = `
//     SELECT 
//        clinic_management_system.patient.name AS patient_name,
//        clinic_management_system.staff.name AS accountant_name,
//        date, invoice_id, status, amount, title, transaction_id, description, method
//        FROM clinic_management_system.invoice 
//        JOIN clinic_management_system.staff 
//        ON Clinic_management_system.staff.staff_id = clinic_management_system.invoice.accountant_id
//        JOIN clinic_management_system.patient 
//        ON Clinic_management_system.patient.patient_id = clinic_management_system.invoice.patient_id
//        WHERE Clinic_management_system.patient.patient_id=?`;
      
//         db.query(query,[req.params.id],(err, data)=>{
//             if(err) return res.status(500).json("Internal server error");
    
//             return res.status(200).json((data))
//         })
//     }

// export const addInvoice = (req, res)=>{
//     const values = [
//         req.body.title,
//         req.body.amount,
//         req.body.patient_id,
//         req.body.accountant_id,
//         req.body.date,
//         req.body.status,
//         req.body.transaction_id,
//         req.body.description
//     ]
//     const query = "INSERT INTO invoice(`title`, `amount`, `patient_id`, `accountant_id`, `date`, `status`, `transaction_id`, `description`) VALUES(?)";

//     db.query(query, [values], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const updateInvoice = (req, res)=>{
//     const values = [
//         req.body.title,
//         req.body.amount,
//         req.body.patient_id,
//         req.body.accountant_id,
//         req.body.date,
//         req.body.status,
//         req.body.description
//     ]
//     const updateId = req.params.id;
//     const query = "UPDATE invoice SET title=?, amount=?, patient_id=?, accountant_id=?, date=?, status=?, description=? WHERE invoice_id=?";

//     db.query(query, [...values, updateId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const updateStatus = (req, res)=>{
//     const values = [
//         req.body.status
//     ]
//     const updateId = req.params.id;
//     const query = "UPDATE invoice SET status=? WHERE invoice_id=?";

//     db.query(query, [...values, updateId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }


// export const removeInvoice = (req, res)=>{

//     const query = "DELETE FROM invoice WHERE invoice_id = ?";
//     const invoiceId = req.params.id;

//     db.query(query, [invoiceId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }