import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const db_name = process.env.DB_DBNAME


export const getReports = async (req, res) => {
    const query = `
        SELECT  
            ${db_name}.patient.name AS patient_name,
            ${db_name}.report.report_id,
            ${db_name}.report.patient_id,
            ${db_name}.report.doctor_id,
            ${db_name}.report.date,
            ${db_name}.report.description,
            ${db_name}.staff.name AS doctor_name
        FROM ${db_name}.report 
        JOIN ${db_name}.patient 
            ON ${db_name}.report.patient_id = ${db_name}.patient.patient_id
        JOIN ${db_name}.staff 
            ON ${db_name}.report.doctor_id = ${db_name}.staff.staff_id
        WHERE report_type = ?
    `;

    const type = req.params.type;
  let connection;
    try {
        connection = await db.getConnection();
        const [data] = await db.query(query, [type]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Internal server error");
    }finally{
        if(connection) connection.release()
    }
};

export const getAllReports = async (req, res) => {
    const query = `SELECT * FROM report`;
  let connection;
    try {
        connection = await db.getConnection();
        const [data] = await db.query(query);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Internal server error");
    }finally{
        if(connection) connection.release()
    }
};

export const getReport = async (req, res) => {
    const query = `
        SELECT  
            ${db_name}.patient.name AS patient_name,
            ${db_name}.report.report_id,
            ${db_name}.report.date,
            ${db_name}.report.description,
            ${db_name}.report.report_type,
            ${db_name}.staff.name AS doctor_name
        FROM ${db_name}.report 
        JOIN ${db_name}.patient 
            ON ${db_name}.report.patient_id = ${db_name}.patient.patient_id
        JOIN ${db_name}.staff 
            ON ${db_name}.report.doctor_id = ${db_name}.staff.staff_id
        WHERE ${db_name}.report.patient_id = ?
    `;
  let connection;
    try {
        connection = await db.getConnection();
        const [data] = await db.query(query, [req.params.id]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json("Internal server error");
    }finally{
        if(connection) connection.release()
    }
};

export const addReport = async (req, res) => {
    const values = [
        req.body.description, 
        req.body.date, 
        req.body.patient_id,
        req.body.doctor_id, 
        req.body.report_type
    ];
    const query = "INSERT INTO report(`description`, `date`, `patient_id`, `doctor_id`, `report_type`) VALUES(?)";
  let connection;
    try {
        connection = await db.getConnection();
        await db.query(query, [values]);
        res.status(201).json('Report added');
    } catch (err) {
        res.status(500).json("Internal server error");
    }finally{
        if(connection) connection.release()
    }
};

export const updateReport = async (req, res) => {
    const values = [
        req.body.description, 
        req.body.date, 
        req.body.patient_id, 
        req.body.doctor_id, 
        req.body.report_type
    ];
    const updateId = req.params.id;
    const query = "UPDATE report SET description = ?, date = ?, patient_id = ?, doctor_id = ?, report_type = ? WHERE report_id = ?";
  let connection;
    try {
        connection = await db.getConnection();
        await db.query(query, [...values, updateId]);
        res.status(201).json('Report updated');
    } catch (err) {
        res.status(500).json("Internal server error");
    }finally{
        if(connection) connection.release()
    }
};

export const removeReport = async (req, res) => {
    const query = "DELETE FROM report WHERE report_id = ?";
    const reportId = req.params.id;
  let connection;
    try {
        connection = await db.getConnection();
        await db.query(query, [reportId]);
        res.status(200).json('Report removed');
    } catch (err) {
        res.status(500).json("Internal server error");
    }finally{
        if(connection) connection.release()
    }
};


// import db from "../db.js";

// export const getReports = (req, res) =>{
//     const query =
//                 `SELECT  
//                  clinic_management_system.patient.name AS patient_name,
//                  clinic_management_system.report.report_id,
//                  clinic_management_system.report.patient_id,
//                  clinic_management_system.report.date,
//                  clinic_management_system.report.description,
//                  clinic_management_system.staff.name AS doctor_name
//                  FROM clinic_management_system.report 
//                  JOIN clinic_management_system.patient 
//                  ON clinic_management_system.report.patient_id=clinic_management_system.patient.patient_id
//                  JOIN clinic_management_system.staff 
//                  ON clinic_management_system.report.doctor_id=clinic_management_system.staff.staff_id
//                  WHERE report_type=?`;

//     const type = req.params.type

//     db.query(query,[type], (err, data)=>{
//         if(err) return res.status(500).json("Internal server error");

//         return res.status(200).json((data))
//     })
// }

// export const getAllReports = (req, res) =>{
//     const query =`SELECT * FROM report`;

//     db.query(query, (err, data)=>{
//         if(err) return res.status(500).json("Internal server error");

//         return res.status(200).json((data))
//     })
// }

// export const getReport = (req, res) =>{
//     const query =
//                 `SELECT  
//                  clinic_management_system.patient.name AS patient_name,
//                  clinic_management_system.report.report_id,
//                  clinic_management_system.report.date,
//                  clinic_management_system.report.description,
//                  clinic_management_system.report.report_type,
//                  clinic_management_system.staff.name AS doctor_name
//                  FROM clinic_management_system.report 
//                  JOIN clinic_management_system.patient 
//                  ON clinic_management_system.report.patient_id=clinic_management_system.patient.patient_id
//                  JOIN clinic_management_system.staff 
//                  ON clinic_management_system.report.doctor_id=clinic_management_system.staff.staff_id
//                  WHERE clinic_management_system.report.patient_id=?`;

//     db.query(query,[req.params.id], (err, data)=>{
//         if(err) return res.status(500).json("Internal server error");

//         return res.status(200).json((data))
//     })
// }

// export const addReport = (req, res)=>{
//     const values = [
//         req.body.description, 
//         req.body.date, 
//         req.body.patient_id,
//         req.body.doctor_id, 
//         req.body.report_type
//     ]
//     const query = "INSERT INTO report(`description`, `date`, `patient_id`, `doctor_id`, `report_type`) VALUES(?)";

//     db.query(query, [values], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json('Report added')
//     })
// }

// export const updateReport = (req, res)=>{
//     const values = [ 
//         req.body.description, 
//         req.body.date, 
//         req.body.patient_id, 
//         req.body.doctor_id, 
//         req.body.report_type
//     ]
//     const updateId = req.params.id;
//     const query = "UPDATE report SET description =?, date =?, patient_id =?, doctor_id =?, report_type =? WHERE report_id=?";

//     db.query(query, [...values, updateId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const removeReport = (req, res)=>{

//     const query = "DELETE FROM report WHERE report_id = ?";
//     const reportId = req.params.id;

//     db.query(query, [reportId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }