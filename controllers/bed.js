// import db from "../db.js";

// export const getBedList = async (req, res) => {
//   const query = `SELECT * FROM bed`;

//   try {
//     const [rows] = await db.query(query);
//     return res.status(200).json(rows);
//   } catch (err) {
//     return res.status(500).json("Internal server error");
//   }
// };

// export const getBed = async (req, res) => {
//   const query = `SELECT * FROM bed WHERE bed_id=?`;

//   try {
//     const [rows] = await db.query(query, [req.params.id]);
//     return res.status(200).json(rows);
//   } catch (err) {
//     return res.status(500).json("Internal server error");
//   }
// };

// export const addBed = async (req, res) => {
//   const values = [
//     req.body.bed_type,
//     req.body.bed_number,
//     req.body.bed_status,
//     req.body.bed_location,
//     req.body.description,
//   ];
//   const query = "INSERT INTO bed(`bed_type`, `bed_number`, `bed_status`, `bed_location`, `description`) VALUES(?)";

//   try {
//     const [result] = await db.query(query, [values]);
//     return res.status(201).json(result);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

// export const updateBed = async (req, res) => {
//   const values = [
//     req.body.bed_type,
//     req.body.bed_number,
//     req.body.bed_status,
//     req.body.bed_location,
//     req.body.description,
//   ];
//   const updateId = req.params.id;
//   const query = "UPDATE bed SET bed_type= ?, bed_number = ?, bed_status =?, bed_location=?, description=? WHERE bed_id=?";

//   try {
//     const [result] = await db.query(query, [...values, updateId]);
//     return res.status(201).json(result);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

// export const removeBed = async (req, res) => {
//   const query = "DELETE FROM bed WHERE bed_id = ?";
//   const bedId = req.params.id;

//   try {
//     const [result] = await db.query(query, [bedId]);
//     return res.status(200).json(result);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

// // BED ALLOTMENT BACKEND CODE HERE

// export const getBedAllotmentList = async (req, res) => {
//   const query = `
//     SELECT allotment_id, name AS patient_name, bed_type, bed_number, allotment_date, discharge_date,
//       clinic_management_system.bed_allotment.patient_id, 
//       clinic_management_system.bed_allotment.bed_id AS alloted_bed_id 
//     FROM clinic_management_system.bed_allotment 
//     JOIN clinic_management_system.patient 
//       ON clinic_management_system.bed_allotment.patient_id=clinic_management_system.patient.patient_id
//     JOIN clinic_management_system.bed 
//       ON clinic_management_system.bed_allotment.bed_id=clinic_management_system.bed.bed_id`;

//   try {
//     const [rows] = await db.query(query);
//     return res.status(200).json(rows);
//   } catch (err) {
//     return res.status(500).json("Internal server error");
//   }
// };

// export const getBedAllotment = async (req, res) => {
//   const query = `
//     SELECT allotment_id, name AS patient_name, bed_type, bed_number, allotment_date, discharge_date,
//       clinic_management_system.bed_allotment.description 
//     FROM clinic_management_system.bed_allotment 
//     JOIN clinic_management_system.patient 
//       ON clinic_management_system.bed_allotment.patient_id=clinic_management_system.patient.patient_id
//     JOIN clinic_management_system.bed 
//       ON clinic_management_system.bed_allotment.bed_id=clinic_management_system.bed.bed_id
//     WHERE clinic_management_system.bed_allotment.patient_id=?`;

//   try {
//     const [rows] = await db.query(query, [req.params.id]);
//     return res.status(200).json(rows);
//   } catch (err) {
//     return res.status(500).json("Internal server error");
//   }
// };

// export const addBedAllotment = async (req, res) => {
//   const values = [
//     req.body.patient_id,
//     req.body.bed_id,
//     req.body.allotment_date,
//     req.body.discharge_date,
//     req.body.description
//   ];
//   const query = "INSERT INTO bed_allotment(`patient_id`, `bed_id`, `allotment_date`, `discharge_date`, `description`) VALUES(?)";

//   try {
//     const [result] = await db.query(query, [values]);
//     return res.status(201).json(result);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

// export const updateBedAllotment = async (req, res) => {
//   const values = [
//     req.body.patient_id,
//     req.body.bed_id,
//     req.body.allotment_date,
//     req.body.discharge_date,
//     req.body.description,
//   ];
//   const updateId = req.params.id;
//   const query = "UPDATE bed_allotment SET patient_id= ?, bed_id = ?, allotment_date =?, discharge_date=?, description=? WHERE allotment_id=?";

//   try {
//     const [result] = await db.query(query, [...values, updateId]);
//     return res.status(201).json(result);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

// export const removeBedAllotment = async (req, res) => {
//   const query = "DELETE FROM bed_allotment WHERE allotment_id = ?";
//   const allotmentId = req.params.id;

//   try {
//     const [result] = await db.query(query, [allotmentId]);
//     return res.status(200).json(result);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

import db from "../db.js";



export const getBedList = (req, res) =>{

const query = `SELECT * FROM bed`;
      
    db.query(query, (err, data)=>{
        if(err) return res.status(500).json("Internal server error");
    
        return res.status(200).json((data))
    })
}

export const getBed = (req, res) =>{

    const query = `SELECT * FROM bed WHERE bed_id=?`;
          
        db.query(query,[req.params.id],(err, data)=>{
            if(err) return res.status(500).json("Internal server error");
        
            return res.status(200).json((data))
        })
    }


export const addBed = (req, res)=>{
    const values = [
        req.body.bed_type,
        req.body.bed_number,
        req.body.bed_status,
        req.body.bed_location,
        req.body.description,
    ]
    const query = "INSERT INTO bed(`bed_type`, `bed_number`, `bed_status`, `bed_location`, `description`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateBed = (req, res)=>{
    const values = [
        req.body.bed_type,
        req.body.bed_number,
        req.body.bed_status,
        req.body.bed_location,
        req.body.description,
    ]

    const updateId = req.params.id;
    const query = "UPDATE bed SET bed_type= ?, bed_number = ?, bed_status =?, bed_location=?, description=? WHERE bed_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeBed = (req, res)=>{

    const query = "DELETE FROM bed WHERE bed_id = ?";
    const appointmentId = req.params.id;

    db.query(query, [appointmentId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

// BED ALLOTMENT BACKEND CODE HERE

export const getBedAllotmentList = (req, res) =>{

    const 
       query = `
       SELECT allotment_id, name AS patient_name, bed_type, bed_number, allotment_date, discharge_date,
       clinic_management_system.bed_allotment.patient_id 
       FROM clinic_management_system.bed_allotment 
       JOIN clinic_management_system.patient 
       ON clinic_management_system.bed_allotment.patient_id=clinic_management_system.patient.patient_id
       JOIN clinic_management_system.bed 
       ON clinic_management_system.bed_allotment.bed_id=clinic_management_system.bed.bed_id`;
          
        db.query(query, (err, data)=>{
            if(err) return res.status(500).json("Internal server error");
        
            return res.status(200).json((data))
        })
    }

    export const getBedAllotment = (req, res) =>{

        const 
           query = `
           SELECT allotment_id, name AS patient_name, bed_type, bed_number, allotment_date, discharge_date,
           clinic_management_system.bed_allotment.description 
           FROM clinic_management_system.bed_allotment 
           JOIN clinic_management_system.patient 
           ON clinic_management_system.bed_allotment.patient_id=clinic_management_system.patient.patient_id
           JOIN clinic_management_system.bed 
           ON clinic_management_system.bed_allotment.bed_id=clinic_management_system.bed.bed_id
           WHERE clinic_management_system.bed_allotment.patient_id=?`;
              
            db.query(query,[req.params.id],(err, data)=>{
                if(err) return res.status(500).json("Internal server error");
            
                return res.status(200).json((data))
            })
        }

    export const addBedAllotment = (req, res)=>{
        const values = [
            req.body.patient_id,
            req.body.bed_id,
            req.body.allotment_date,
            req.body.discharge_date,
            req.body.description
        ]
        const query = "INSERT INTO bed_allotment(`patient_id`, `bed_id`, `allotment_date`, `discharge_date`, `description`) VALUES(?)";
    
        db.query(query, [values], (err, data) => {
            if (err) return res.send(err)
            
            return res.status(201).json(data)
        })
    }

    export const updateBedAllotment = (req, res)=>{
        const values = [
            req.body.patient_id,
            req.body.bed_id,
            req.body.allotment_date,
            req.body.discharge_date,
        ]
    
        const updateId = req.params.id;
        const query = "UPDATE bed_allotment SET patient_id= ?, bed_id = ?, allotment_date =?, discharge_date=? WHERE allotment_id=?";
    
        db.query(query, [...values, updateId], (err, data) => {
            if (err) return res.send(err)
            
            return res.status(201).json(data)
        })
    }

    export const removeBedAllotment = (req, res)=>{

        const query = "DELETE FROM bed_allotment WHERE allotment_id = ?";
        const allotmentId = req.params.id;
    
        db.query(query, [allotmentId], (err, data) => {
            if (err) return res.send(err)
            
            return res.status(200).json(data)
        })
    }