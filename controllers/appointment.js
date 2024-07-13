import db from "../db.js";



export const getAppointmentList = (req, res) =>{

const query = `
SELECT 
   clinic_management_system.patient.name AS patient_name,
   clinic_management_system.staff.name AS doctor_name,
   date, appointment_id, description, title, doctor_id,
   clinic_management_system.appointment.patient_id AS patient_id
   FROM clinic_management_system.appointment 
   JOIN clinic_management_system.staff 
   ON Clinic_management_system.staff.staff_id = clinic_management_system.appointment.doctor_id
   JOIN clinic_management_system.patient 
   ON Clinic_management_system.patient.patient_id = clinic_management_system.appointment.patient_id;`;
  
    db.query(query, (err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const getAppointment = (req, res) =>{

    const query = `
    SELECT 
       clinic_management_system.patient.name AS patient_name,
       clinic_management_system.staff.name AS doctor_name,
       date, appointment_id, description, title
       FROM clinic_management_system.appointment 
       JOIN clinic_management_system.staff 
       ON Clinic_management_system.staff.staff_id = clinic_management_system.appointment.doctor_id
       JOIN clinic_management_system.patient 
       ON Clinic_management_system.patient.patient_id = clinic_management_system.appointment.patient_id
       WHERE clinic_management_system.patient.patient_id=?`;
      
        db.query(query,[req.params.id],(err, data)=>{
            if(err) return res.status(500).json("Internal server error");
    
            return res.status(200).json((data))
        })
    }

export const addAppointment = (req, res)=>{
    const values = [
        req.body.date,
        req.body.doctor_id,
        req.body.patient_id,
        req.body.title,
        req.body.description,
    ]
    const query = "INSERT INTO appointment(`date`, `doctor_id`, `patient_id`, `title`, `description`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateAppointment = (req, res)=>{
    const values = [
        req.body.date,
        req.body.doctor_id,
        req.body.patient_id,
        req.body.title,
        req.body.description
    ]
    const updateId = req.params.id;
    const query = "UPDATE appointment SET date = ?, doctor_id = ?, patient_id =?, title =?, description=? WHERE appointment_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeAppointment = (req, res)=>{

    const query = "DELETE FROM appointment WHERE appointment_id = ?";
    const appointmentId = req.params.id;

    db.query(query, [appointmentId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}