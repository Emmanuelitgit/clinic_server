// import db from "../db.js";

// // PRESCRIPTIONS HERE

// export const getPrescriptions = async (req, res) => {
//     const query = `
//         SELECT clinic_management_system.patient.name AS patient_name,
//                clinic_management_system.staff.name AS doctor_name,
//                clinic_management_system.prescription.prescription_id,
//                clinic_management_system.prescription.medication,
//                clinic_management_system.prescription.date,
//                clinic_management_system.invoice.status AS payment_status,
//                clinic_management_system.prescription.patient_id,
//                clinic_management_system.prescription.description,
//                clinic_management_system.prescription.doctor_id,
//                clinic_management_system.prescription.status AS med_status
//         FROM clinic_management_system.prescription 
//         JOIN clinic_management_system.patient 
//             ON clinic_management_system.patient.patient_id = clinic_management_system.prescription.patient_id
//         JOIN clinic_management_system.staff
//             ON clinic_management_system.staff.staff_id = clinic_management_system.prescription.doctor_id
//         LEFT JOIN clinic_management_system.invoice
//             ON clinic_management_system.prescription.patient_id = clinic_management_system.invoice.patient_id
//     `;

//     try {
//         const [data] = await db.query(query);
//         res.status(200).json(data);
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const getPrescriptionsCountForDashBox = async (req, res) => {
//     const query = `
//         SELECT clinic_management_system.patient.name AS patient_name,
//                clinic_management_system.staff.name AS doctor_name,
//                clinic_management_system.prescription.prescription_id,
//                clinic_management_system.prescription.medication,
//                clinic_management_system.prescription.date,
//                clinic_management_system.invoice.status AS payment_status,
//                clinic_management_system.prescription.patient_id,
//                clinic_management_system.prescription.status AS med_status
//         FROM clinic_management_system.prescription 
//         JOIN clinic_management_system.patient 
//             ON clinic_management_system.patient.patient_id = clinic_management_system.prescription.patient_id
//         JOIN clinic_management_system.staff
//             ON clinic_management_system.staff.staff_id = clinic_management_system.prescription.doctor_id
//         LEFT JOIN clinic_management_system.invoice
//             ON clinic_management_system.prescription.patient_id = clinic_management_system.invoice.patient_id
//         WHERE clinic_management_system.prescription.status = 'Item Taken'
//     `;

//     try {
//         const [data] = await db.query(query);
//         res.status(200).json(data);
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const getPrescription = async (req, res) => {
//     const query = `
//         SELECT clinic_management_system.patient.name AS patient_name,
//                clinic_management_system.staff.name AS doctor_name,
//                clinic_management_system.prescription.prescription_id,
//                clinic_management_system.prescription.medication,
//                clinic_management_system.prescription.date,
//                clinic_management_system.invoice.status AS payment_status,
//                clinic_management_system.prescription.description,
//                clinic_management_system.prescription.status AS med_status
//         FROM clinic_management_system.prescription 
//         JOIN clinic_management_system.patient 
//             ON clinic_management_system.patient.patient_id = clinic_management_system.prescription.patient_id
//         JOIN clinic_management_system.staff
//             ON clinic_management_system.staff.staff_id = clinic_management_system.prescription.doctor_id
//         LEFT JOIN clinic_management_system.invoice
//             ON clinic_management_system.prescription.patient_id = clinic_management_system.invoice.patient_id
//         WHERE clinic_management_system.prescription.patient_id = ?
//     `;

//     try {
//         const [data] = await db.query(query, [req.params.id]);
//         res.status(200).json(data);
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const addPrescription = async (req, res) => {
//     const values = [
//         req.body.patient_id,
//         req.body.doctor_id,
//         req.body.medication,
//         req.body.description,
//         req.body.date
//     ];
//     const query = "INSERT INTO prescription(`patient_id`, `doctor_id`, `medication`, `description`, `date`) VALUES(?)";

//     try {
//         await db.query(query, [values]);
//         res.status(201).json('Prescription added');
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const updatePrescription = async (req, res) => {
//     const values = [
//         req.body.patient_id,
//         req.body.doctor_id,
//         req.body.medication,
//         req.body.description,
//         req.body.date
//     ];
//     const updateId = req.params.id;
//     const query = "UPDATE prescription SET patient_id=?, doctor_id=?, medication=?, description=?, date=?  WHERE prescription_id=?";

//     try {
//         await db.query(query, [...values, updateId]);
//         res.status(201).json('Prescription updated');
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const updateStatus = async (req, res) => {
//     const values = [
//         req.body.status,
//     ];
//     const updateId = req.params.id;
//     const query = "UPDATE prescription SET status=? WHERE prescription_id=?";

//     try {
//         await db.query(query, [...values, updateId]);
//         res.status(201).json('Status updated');
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const removePrescription = async (req, res) => {
//     const query = "DELETE FROM prescription WHERE prescription_id = ?";
//     const prescription_bankId = req.params.id;

//     try {
//         await db.query(query, [prescription_bankId]);
//         res.status(200).json('Prescription removed');
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// // MEDICINE CATEGORY BACKEND CODE HERE

// export const getMedicineCategories = async (req, res) => {
//     const query = "SELECT * FROM medicine_category";

//     try {
//         const [data] = await db.query(query);
//         res.status(200).json(data);
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const getMedicineCategory = async (req, res) => {
//     const query = "SELECT * FROM medicine_category WHERE category_id=?";

//     try {
//         const [data] = await db.query(query, [req.params.id]);
//         res.status(200).json(data);
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const addMedicineCategory = async (req, res) => {
//     const values = [
//         req.body.category_name,
//         req.body.description
//     ];
//     const query = "INSERT INTO medicine_category(`category_name`, `description`) VALUES(?)";

//     try {
//         await db.query(query, [values]);
//         res.status(201).json('Category added');
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const updateMedicineCategory = async (req, res) => {
//     const values = [
//         req.body.category_name,
//         req.body.description
//     ];
//     const updateId = req.params.id;
//     const query = "UPDATE medicine_category SET category_name=?, description=? WHERE category_id=?";

//     try {
//         await db.query(query, [...values, updateId]);
//         res.status(201).json('Category updated');
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const removeMedicineCategory = async (req, res) => {
//     const query = "DELETE FROM medicine_category WHERE category_id = ?";
//     const category_id = req.params.id;

//     try {
//         await db.query(query, [category_id]);
//         res.status(200).json('Category removed');
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// // MEDICINE BACKEND CODE HERE
// export const getMedicineList = async (req, res) => {
//     const query = "SELECT * FROM medicine";

//     try {
//         const [data] = await db.query(query);
//         res.status(200).json(data);
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const getMedicine = async (req, res) => {
//     const query = "SELECT * FROM medicine WHERE medicine_id=?";

//     try {
//         const [data] = await db.query(query, [req.params.id]);
//         res.status(200).json(data);
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const addMedicine = async (req, res) => {
//     const values = [
//         req.body.name,
//         req.body.category,
//         req.body.description,
//         req.body.price,
//         req.body.manufacturer,
//         req.body.status
//     ];
//     const query = "INSERT INTO medicine(`name`, `category`, `description`, `price`, `manufacturer`, `status`) VALUES(?)";

//     try {
//         await db.query(query, [values]);
//         res.status(201).json('Medicine added');
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const updateMedicine = async (req, res) => {
//     const values = [
//         req.body.name,
//         req.body.category,
//         req.body.description,
//         req.body.price,
//         req.body.manufacturer,
//         req.body.status
//     ];
//     const updateId = req.params.id;
//     const query = "UPDATE medicine SET name=?, category=?, description=?, price=?, manufacturer=?, status=? WHERE medicine_id=?";

//     try {
//         await db.query(query, [...values, updateId]);
//         res.status(201).json('Medicine updated');
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }

// export const removeMedicine = async (req, res) => {
//     const query = "DELETE FROM medicine WHERE medicine_id = ?";
//     const category_id = req.params.id;

//     try {
//         await db.query(query, [category_id]);
//         res.status(200).json('Medicine removed');
//     } catch (err) {
//         res.status(500).json("Internal server error");
//     }
// }


import db from "../db.js";

// PRESCRIPTIONS HERE

export const getPrescriptions = (req, res) =>{
    const query = `
    SELECT clinic_management_system.patient.name AS patient_name,
    clinic_management_system.staff.name AS doctor_name,
    clinic_management_system.prescription.prescription_id,
    clinic_management_system.prescription.medication,
    clinic_management_system.prescription.date,
    clinic_management_system.invoice.status AS payment_status,
    clinic_management_system.prescription.patient_id,
    clinic_management_system.prescription.status AS med_status
    FROM clinic_management_system.prescription 
    JOIN clinic_management_system.patient 
    ON clinic_management_system.patient.patient_id = clinic_management_system.prescription.patient_id
    JOIN clinic_management_system.staff
    ON clinic_management_system.staff.staff_id = clinic_management_system.prescription.doctor_id
    LEFT JOIN clinic_management_system.invoice
    ON clinic_management_system.prescription.patient_id=clinic_management_system.invoice.patient_id
    `;

    db.query(query, (err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const getPrescriptionsCountForDashBox = (req, res) =>{
    const query = `
    SELECT clinic_management_system.patient.name AS patient_name,
    clinic_management_system.staff.name AS doctor_name,
    clinic_management_system.prescription.prescription_id,
    clinic_management_system.prescription.medication,
    clinic_management_system.prescription.date,
    clinic_management_system.invoice.status AS payment_status,
    clinic_management_system.prescription.patient_id,
    clinic_management_system.prescription.status AS med_status
    FROM clinic_management_system.prescription 
    JOIN clinic_management_system.patient 
    ON clinic_management_system.patient.patient_id = clinic_management_system.prescription.patient_id
    JOIN clinic_management_system.staff
    ON clinic_management_system.staff.staff_id = clinic_management_system.prescription.doctor_id
    LEFT JOIN clinic_management_system.invoice
    ON clinic_management_system.prescription.patient_id=clinic_management_system.invoice.patient_id
    WHERE clinic_management_system.prescription.status = 'Item Taken'
    `;

    db.query(query, (err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const getPrescription = (req, res) =>{
    const query = `
    SELECT clinic_management_system.patient.name AS patient_name,
    clinic_management_system.staff.name AS doctor_name,
    clinic_management_system.prescription.prescription_id,
    clinic_management_system.prescription.medication,
    clinic_management_system.prescription.date,
    clinic_management_system.invoice.status AS payment_status,
    clinic_management_system.prescription.description,
    clinic_management_system.prescription.status AS med_status
    FROM clinic_management_system.prescription 
    JOIN clinic_management_system.patient 
    ON clinic_management_system.patient.patient_id = clinic_management_system.prescription.patient_id
    JOIN clinic_management_system.staff
    ON clinic_management_system.staff.staff_id = clinic_management_system.prescription.doctor_id
    LEFT JOIN clinic_management_system.invoice
    ON clinic_management_system.prescription.patient_id=clinic_management_system.invoice.patient_id
    WHERE clinic_management_system.prescription.patient_id=?
    `;

    db.query(query,[req.params.id],(err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const addPrescription = (req, res)=>{
    const values = [
        req.body.patient_id,
        req.body.doctor_id,
        req.body.medication,
        req.body.description,
        req.body.date
    ]
    const query = "INSERT INTO prescription(`patient_id`, `doctor_id`, `medication`, `description`, `date`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updatePrescription = (req, res)=>{
    const values = [
        req.body.patient_id,
        req.body.doctor_id,
        req.body.medication,
        req.body.description,
        req.body.date
    ]
    const updateId = req.params.id;
    const query = "UPDATE prescription SET patient_id=?, doctor_id=?, medication=?, description=?, date=?  WHERE prescription_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateStatus = (req, res)=>{
    const values = [
        req.body.status,
    ]
    const updateId = req.params.id;
    const query = "UPDATE prescription SET status=? WHERE prescription_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removePrescription = (req, res)=>{

    const query = "DELETE FROM prescription WHERE prescription_id = ?";
    const prescription_bankId = req.params.id;

    db.query(query, [prescription_bankId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

// MEDICINE CATEGORY BACKEND CODE HERE

export const getMedicineCategories = (req, res) =>{
    const query = "SELECT * FROM medicine_category";

    db.query(query, (err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const getMedicineCategory = (req, res) =>{
    const query = "SELECT * FROM medicine_category WHERE category_id=?";

    db.query(query,[req.params.id],(err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const addMedicineCategory = (req, res)=>{
    const values = [
        req.body.category_name,
        req.body.description
    ]
    const query = "INSERT INTO medicine_category(`category_name`, `description`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateMedicineCategory = (req, res)=>{
    const values = [
        req.body.category_name,
        req.body.description
    ]
    const updateId = req.params.id;
    const query = "UPDATE medicine_category SET category_name=?, description=? WHERE category_id=?";

    db.query(query, [...values, updateId], (err, data) => { 
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeMedicineCategory = (req, res)=>{

    const query = "DELETE FROM medicine_category WHERE category_id = ?";
    const category_id = req.params.id;

    db.query(query, [category_id], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

// MEDICINE BACKEND CODE HERE
export const getMedicineList = (req, res) =>{
    const query = "SELECT * FROM medicine";

    db.query(query, (err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}


export const getMedicine = (req, res) =>{
    const query = "SELECT * FROM medicine WHERE medicine_id=?";

    db.query(query,[req.params.id],(err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const addMedicine = (req, res)=>{
    const values = [
        req.body.name,
        req.body.category,
        req.body.description,
        req.body.price,
        req.body.manufacturer,
        req.body.status
    ]
    const query = "INSERT INTO medicine(`name`, `category`, `description`, `price`, `manufacturer`, `status`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateMedicine = (req, res)=>{
    const values = [
        req.body.name,
        req.body.category,
        req.body.description,
        req.body.price,
        req.body.manufacturer,
        req.body.status
    ]
    const updateId = req.params.id;
    const query = "UPDATE medicine SET name=?, category=?, description=?, price=?, manufacturer=?, status=? WHERE medicine_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeMedicine = (req, res)=>{

    const query = "DELETE FROM medicine WHERE medicine_id = ?";
    const category_id = req.params.id;

    db.query(query, [category_id], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}