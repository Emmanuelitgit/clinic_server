
import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const db_name = process.env.DB_DBNAME

export const patientList = async (req, res) => {
  const query = "SELECT * FROM patient";

  try {
    const [rows] = await db.query(query);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getPatient = async (req, res) => {
  const query = "SELECT * FROM patient WHERE patient_id=?";

  try {
    const [rows] = await db.query(query, [req.params.id]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addPatient = async (req, res) => {
  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.address,
    req.body.age,
    req.body.sex,
    req.body.birth_date,
    req.body.blood_group,
    req.body.profile
  ];
  const query = "INSERT INTO patient(`name`, `email`, `phone`, `address`, `age`, `sex`, `birth_date`, `blood_group`, `profile`) VALUES(?)";

  try {
    const [result] = await db.query(query, [values]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updatePatient = async (req, res) => {
  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.address,
    req.body.age,
    req.body.sex,
    req.body.birth_date,
    req.body.blood_group,
    req.body.profile
  ];
  const updateId = req.params.id;
  const query = "UPDATE patient SET name=?, email=?, phone=?, address=?, age=?, sex=?, birth_date=?, blood_group=?, profile=? WHERE patient_id=?";

  try {
    const [result] = await db.query(query, [...values, updateId]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const removePatient = async (req, res) => {
  const query = "DELETE FROM patient WHERE patient_id = ?";
  const patientId = req.params.id;

  try {
    const [result] = await db.query(query, [patientId]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// VITAL BACKEND CODE HERE

export const getVitalList = async (req, res) => {
  const query = `
    SELECT 
        ${db_name}.patient.name AS patient_name,
        ${db_name}.staff.name AS nurse_name,
        ${db_name}.vital.age AS patient_age,
        vital_id, height, temperature, date, bp_level,
        ${db_name}.vital.patient_id
    FROM ${db_name}.vital
    JOIN ${db_name}.patient
        ON ${db_name}.vital.patient_id = ${db_name}.patient.patient_id
    JOIN ${db_name}.staff
        ON ${db_name}.vital.nurse_id = ${db_name}.staff.staff_id;
  `;

  try {
    const [rows] = await db.query(query);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

export const getVital = async (req, res) => {
  const query = `
    SELECT 
        ${db_name}.patient.name AS patient_name,
        ${db_name}.staff.name AS nurse_name,
        ${db_name}.vital.age AS patient_age,
        vital_id, height, temperature, date, bp_level, comment
    FROM ${db_name}.vital
    JOIN ${db_name}.patient
        ON ${db_name}.vital.patient_id = ${db_name}.patient.patient_id
    JOIN ${db_name}.staff
        ON ${db_name}.vital.nurse_id = ${db_name}.staff.staff_id
    WHERE ${db_name}.vital.patient_id=?
  `;

  try {
    const [rows] = await db.query(query, [req.params.id]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json("Internal server error");
  }
};

export const addVital = async (req, res) => {
  const values = [
    req.body.patient_id,
    req.body.nurse_id,
    req.body.date,
    req.body.bp_level,
    req.body.temperature,
    req.body.height,
    req.body.age,
    req.body.comment
  ];
  const query = "INSERT INTO vital(`patient_id`, `nurse_id`, `date`, `bp_level`, `temperature`, `height`, `age`, `comment`) VALUES(?)";

  try {
    const [result] = await db.query(query, [values]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateVital = async (req, res) => {
  const values = [
    req.body.patient_id,
    req.body.nurse_id,
    req.body.date,
    req.body.bp_level,
    req.body.temperature,
    req.body.height,
    req.body.age,
    req.body.comment
  ];
  const updateId = req.params.id;
  const query = "UPDATE vital SET patient_id=?, nurse_id=?, date=?, bp_level=?, temperature=?, height=?, age=?, comment=? WHERE vital_id=?";

  try {
    const [result] = await db.query(query, [...values, updateId]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const removeVital = async (req, res) => {
  const query = "DELETE FROM vital WHERE vital_id = ?";
  const vitalId = req.params.id;

  try {
    const [result] = await db.query(query, [vitalId]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// import db from "../db.js";

// export const patientList = async(req, res) =>{
//    try {
//     const query = await "SELECT * FROM patient";

//     await db.query(query, (err, data)=>{
//         if(err) return res.status(500).json(err);
//         return res.status(200).json((data))
//     })
//    } catch (error) {
//     console.log(error)
//    }
// }

// export const getPatient = async(req, res)=>{
//    try {
//     const query = await "SELECT * FROM patient WHERE patient_id=?";

//    await db.query(query, [req.params.id], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
//    } catch (error) {
//     console.log
//    }
// }

// export const addPatient = (req, res)=>{
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.phone,
//         req.body.address,
//         req.body.age,
//         req.body.sex,
//         req.body.birth_date,
//         req.body.blood_group,
//         req.body.profile
//     ]
//     const query = "INSERT INTO patient(`name`, `email`, `phone`, `address`, `age`, `sex`, `birth_date`, `blood_group`, `profile`) VALUES(?)";

//     db.query(query, [values], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const updatePatient = (req, res)=>{
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.phone,
//         req.body.address,
//         req.body.age,
//         req.body.sex,
//         req.body.birth_date,
//         req.body.blood_group,
//         req.body.profile
//     ]
//     const updateId = req.params.id;
//     const query = "UPDATE patient SET name=?, email=?, phone=?, address=?, age=?, sex=?, birth_date=?, blood_group=?, profile=? WHERE patient_id=?";

//     db.query(query, [...values, updateId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const removePatient = (req, res)=>{

//     const query = "DELETE FROM patient WHERE patient_id = ?";
//     const staffId = req.params.id;

//     db.query(query, [staffId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }

// // VITAL BACKEND CODE HERE

// export const getVitalList = (req, res) =>{
//     const query = `
//     SELECT 
//         clinic_management_system.patient.name AS patient_name,
//         clinic_management_system.staff.name AS nurse_name,
//         clinic_management_system.vital.age AS patient_age,
//         vital_id, height, temperature, date, bp_level,
//         clinic_management_system.vital.patient_id
//         FROM clinic_management_system.vital
//         JOIN clinic_management_system.patient
//         ON clinic_management_system.vital.patient_id = clinic_management_system.patient.patient_id
//         JOIN clinic_management_system.staff
//         ON clinic_management_system.vital.nurse_id = clinic_management_system.staff.staff_id;
//     `;

//     db.query(query, (err, data)=>{
//         if(err) return res.status(500).json("Internal server error");

//         return res.status(200).json((data))
//     })
// }

// export const getVital = (req, res) =>{
//     const query = `
//     SELECT 
//         clinic_management_system.patient.name AS patient_name,
//         clinic_management_system.staff.name AS nurse_name,
//         clinic_management_system.vital.age AS patient_age,
//         vital_id, height, temperature, date, bp_level, comment
//         FROM clinic_management_system.vital
//         JOIN clinic_management_system.patient
//         ON clinic_management_system.vital.patient_id = clinic_management_system.patient.patient_id
//         JOIN clinic_management_system.staff
//         ON clinic_management_system.vital.nurse_id = clinic_management_system.staff.staff_id
//         WHERE clinic_management_system.vital.patient_id=?
//         ;
//     `;

//     db.query(query,[req.params.id],(err, data)=>{
//         if(err) return res.status(500).json("Internal server error");

//         return res.status(200).json((data))
//     })
// }

// export const addVital = (req, res)=>{
//     const values = [
//         req.body.patient_id,
//         req.body.nurse_id,
//         req.body.date,
//         req.body.bp_level,
//         req.body.temperature,
//         req.body.height,
//         req.body.age,
//         req.body.comment
//     ]
//     const query = "INSERT INTO vital(`patient_id`, `nurse_id`, `date`, `bp_level`, `temperature`, `height`, `age`, `comment`) VALUES(?)";

//     db.query(query, [values], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const updateVital = (req, res)=>{
//     const values = [
//         req.body.patient_id,
//         req.body.nurse_id,
//         req.body.date,
//         req.body.bp_level,
//         req.body.temperature,
//         req.body.height,
//         req.body.age,
//         req.body.comment,
//     ]
//     const updateId = req.params.id;
//     const query = "UPDATE vital SET patient_id=?, nurse_id=?, date=?, bp_level=?, temperature=?, height=?, age=?, comment=? WHERE vital_id=?";

//     db.query(query, [...values, updateId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const removeVital = (req, res)=>{

//     const query = "DELETE FROM vital WHERE vital_id = ?";
//     const vitalId = req.params.id;

//     db.query(query, [vitalId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }