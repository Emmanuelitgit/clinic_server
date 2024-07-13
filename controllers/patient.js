import db from "../db.js";

export const patientList = (req, res) =>{
    const query = "SELECT * FROM patient";

    db.query(query, (err, data)=>{
        if(err) return res.status(500).json(err);

        return res.status(200).json((data))
    })
}

export const getPatient = (req, res)=>{
    const query = "SELECT * FROM patient WHERE patient_id=?";

    db.query(query, [req.params.id], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

export const addPatient = (req, res)=>{
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
    ]
    const query = "INSERT INTO patient(`name`, `email`, `phone`, `address`, `age`, `sex`, `birth_date`, `blood_group`, `profile`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updatePatient = (req, res)=>{
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
    ]
    const updateId = req.params.id;
    const query = "UPDATE patient SET name=?, email=?, phone=?, address=?, age=?, sex=?, birth_date=?, blood_group=?, profile=? WHERE patient_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removePatient = (req, res)=>{

    const query = "DELETE FROM patient WHERE patient_id = ?";
    const staffId = req.params.id;

    db.query(query, [staffId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

// VITAL BACKEND CODE HERE

export const getVitalList = (req, res) =>{
    const query = `
    SELECT 
        clinic_management_system.patient.name AS patient_name,
        clinic_management_system.staff.name AS nurse_name,
        clinic_management_system.vital.age AS patient_age,
        vital_id, height, temperature, date, bp_level,
        clinic_management_system.vital.patient_id
        FROM clinic_management_system.vital
        JOIN clinic_management_system.patient
        ON clinic_management_system.vital.patient_id = clinic_management_system.patient.patient_id
        JOIN clinic_management_system.staff
        ON clinic_management_system.vital.nurse_id = clinic_management_system.staff.staff_id;
    `;

    db.query(query, (err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const getVital = (req, res) =>{
    const query = `
    SELECT 
        clinic_management_system.patient.name AS patient_name,
        clinic_management_system.staff.name AS nurse_name,
        clinic_management_system.vital.age AS patient_age,
        vital_id, height, temperature, date, bp_level, comment
        FROM clinic_management_system.vital
        JOIN clinic_management_system.patient
        ON clinic_management_system.vital.patient_id = clinic_management_system.patient.patient_id
        JOIN clinic_management_system.staff
        ON clinic_management_system.vital.nurse_id = clinic_management_system.staff.staff_id
        WHERE clinic_management_system.vital.patient_id=?
        ;
    `;

    db.query(query,[req.params.id],(err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const addVital = (req, res)=>{
    const values = [
        req.body.patient_id,
        req.body.nurse_id,
        req.body.date,
        req.body.bp_level,
        req.body.temperature,
        req.body.height,
        req.body.age,
        req.body.comment
    ]
    const query = "INSERT INTO vital(`patient_id`, `nurse_id`, `date`, `bp_level`, `temperature`, `height`, `age`, `comment`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateVital = (req, res)=>{
    const values = [
        req.body.patient_id,
        req.body.nurse_id,
        req.body.date,
        req.body.bp_level,
        req.body.temperature,
        req.body.height,
        req.body.age,
        req.body.comment,
    ]
    const updateId = req.params.id;
    const query = "UPDATE vital SET patient_id=?, nurse_id=?, date=?, bp_level=?, temperature=?, height=?, age=?, comment=? WHERE vital_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeVital = (req, res)=>{

    const query = "DELETE FROM vital WHERE vital_id = ?";
    const vitalId = req.params.id;

    db.query(query, [vitalId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}