// // import db from "../db.js";

// // export const getBloodBankList = async (req, res) => {
// //   const query = "SELECT * FROM blood_bank";

// //   try {
// //     const [rows] = await db.query(query);
// //     return res.status(200).json(rows);
// //   } catch (err) {
// //     return res.status(500).json("Internal server error");
// //   }
// // };

// // export const getBloodBank = async (req, res) => {
// //   const query = "SELECT * FROM blood_bank WHERE blood_bank_id=?";

// //   try {
// //     const [rows] = await db.query(query, [req.params.id]);
// //     return res.status(200).json(rows);
// //   } catch (err) {
// //     return res.status(500).json("Internal server error");
// //   }
// // };

// // export const addBloodBank = async (req, res) => {
// //   const values = [
// //     req.body.blood_group,
// //     req.body.status
// //   ];
// //   const query = "INSERT INTO blood_bank(`blood_group`, `status`) VALUES(?)";

// //   try {
// //     const [result] = await db.query(query, [values]);
// //     return res.status(201).json(result);
// //   } catch (err) {
// //     return res.status(500).json(err);
// //   }
// // };

// // export const updateBloodBank = async (req, res) => {
// //   const values = [
// //     req.body.blood_group,
// //     req.body.status
// //   ];
// //   const updateId = req.params.id;
// //   const query = "UPDATE blood_bank SET blood_group=?, status=? WHERE blood_bank_id=?";

// //   try {
// //     const [result] = await db.query(query, [...values, updateId]);
// //     return res.status(201).json(result);
// //   } catch (err) {
// //     return res.status(500).json(err);
// //   }
// // };

// // export const removeBloodBank = async (req, res) => {
// //   const query = "DELETE FROM blood_bank WHERE blood_bank_id = ?";
// //   const blood_bankId = req.params.id;

// //   try {
// //     const [result] = await db.query(query, [blood_bankId]);
// //     return res.status(200).json(result);
// //   } catch (err) {
// //     return res.status(500).json(err);
// //   }
// // };

// // // BLOOD DONOR BACKEND CODE HERE

// // export const getBloodDonorList = async (req, res) => {
// //   const query = "SELECT * FROM blood_donor";

// //   try {
// //     const [rows] = await db.query(query);
// //     return res.status(200).json(rows);
// //   } catch (err) {
// //     return res.status(500).json("Internal server error");
// //   }
// // };

// // export const getBloodDonor = async (req, res) => {
// //   const query = "SELECT * FROM blood_donor WHERE blood_donor_id=?";

// //   try {
// //     const [rows] = await db.query(query, [req.params.id]);
// //     return res.status(200).json(rows);
// //   } catch (err) {
// //     return res.status(500).json("Internal server error");
// //   }
// // };

// // export const addBloodDonor = async (req, res) => {
// //   const values = [
// //     req.body.name,
// //     req.body.email,
// //     req.body.address, 
// //     req.body.phone, 
// //     req.body.sex, 
// //     req.body.age, 
// //     req.body.blood_group, 
// //     req.body.last_donation_date
// //   ];
// //   const query = "INSERT INTO blood_donor(`name`, `email`, `address`, `phone`, `sex`, `age`, `blood_group`, `last_donation_date`) VALUES(?)";

// //   try {
// //     const [result] = await db.query(query, [values]);
// //     return res.status(201).json(result);
// //   } catch (err) {
// //     return res.status(500).json(err);
// //   }
// // };

// // export const updateBloodDonor = async (req, res) => {
// //   const values = [
// //     req.body.name,
// //     req.body.email,
// //     req.body.address, 
// //     req.body.phone, 
// //     req.body.sex, 
// //     req.body.age, 
// //     req.body.blood_group, 
// //     req.body.last_donation_date
// //   ];
// //   const updateId = req.params.id;
// //   const query = "UPDATE blood_donor SET name=?, email=?, address=?, phone=?, sex=?, age=?, blood_group=?, last_donation_date=? WHERE blood_donor_id=?";

// //   try {
// //     const [result] = await db.query(query, [...values, updateId]);
// //     return res.status(201).json(result);
// //   } catch (err) {
// //     return res.status(500).json(err);
// //   }
// // };

// // export const removeBloodDonor = async (req, res) => {
// //   const query = "DELETE FROM blood_donor WHERE blood_donor_id = ?";
// //   const blood_donorId = req.params.id;

// //   try {
// //     const [result] = await db.query(query, [blood_donorId]);
// //     return res.status(200).json(result);
// //   } catch (err) {
// //     return res.status(500).json(err);
// //   }
// // };


// import db from "../db.js";

// export const getBloodBankList = (req, res) =>{
//     const query = "SELECT * FROM blood_bank";

//     db.query(query, (err, data)=>{
//         if(err) return res.status(500).json("Internal server error");

//         return res.status(200).json((data))
//     })
// }

// export const getBloodBank = (req, res) =>{
//     const query = "SELECT * FROM blood_bank WHERE blood_bank_id=?";

//     db.query(query,[req.params.id],(err, data)=>{
//         if(err) return res.status(500).json("Internal server error");

//         return res.status(200).json((data))
//     })
// }

// export const addBloodBank = (req, res)=>{
//     const values = [
//         req.body.blood_group,
//         req.body.status
//     ]
//     const query = "INSERT INTO blood_bank(`blood_group`, `status`) VALUES(?)";

//     db.query(query, [values], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const updateBloodBank = (req, res)=>{
//     const values = [
//         req.body.blood_group,
//         req.body.status
//     ]
//     const updateId = req.params.id;
//     const query = "UPDATE blood_bank SET blood_group=?, status=? WHERE blood_bank_id=?";

//     db.query(query, [...values, updateId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const removeBloodBank = (req, res)=>{

//     const query = "DELETE FROM blood_bank WHERE blood_bank_id = ?";
//     const blood_bankId = req.params.id;

//     db.query(query, [blood_bankId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }

// // BLOOD DONOR BACKEND CODE HERE

// export const getBloodDonorList = (req, res) =>{
//     const query = "SELECT * FROM blood_donor";

//     db.query(query, (err, data)=>{
//         if(err) return res.status(500).json("Internal server error");

//         return res.status(200).json((data))
//     })
// }

// export const getBloodDonor = (req, res) =>{
//     const query = "SELECT * FROM blood_donor WHERE blood_donor_id=?";

//     db.query(query,[req.params.id],(err, data)=>{
//         if(err) return res.status(500).json("Internal server error");

//         return res.status(200).json((data))
//     })
// }

// export const addBloodDonor = (req, res)=>{
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.address, 
//         req.body.phone, 
//         req.body.sex, 
//         req.body.age, 
//         req.body.blood_group, 
//         req.body.last_donation_date
//     ]
//     const query = "INSERT INTO blood_donor(`name`, `email`, `address`, `phone`, `sex`, `age`, `blood_group`, `last_donation_date`) VALUES(?)";

//     db.query(query, [values], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const updateBloodDonor = (req, res)=>{
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.address, 
//         req.body.phone, 
//         req.body.sex, 
//         req.body.age, 
//         req.body.blood_group, 
//         req.body.last_donation_date
//     ]
//     const updateId = req.params.id;
//     const query = "UPDATE blood_donor SET name =?, email =?, address =?, phone =?, sex =?, age =?, blood_group =?, last_donation_date =? WHERE blood_donor_id=?";

//     db.query(query, [...values, updateId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const removeBloodDonor = (req, res)=>{

//     const query = "DELETE FROM blood_donor WHERE blood_donor_id = ?";
//     const blood_donorId = req.params.id;

//     db.query(query, [blood_donorId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }


import db from "../db.js";

export const getBloodBankList = (req, res) =>{
    const query = "SELECT * FROM blood_bank";

    db.query(query, (err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const getBloodBank = (req, res) =>{
    const query = "SELECT * FROM blood_bank WHERE blood_bank_id=?";

    db.query(query,[req.params.id],(err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const addBloodBank = (req, res)=>{
    const values = [
        req.body.blood_group,
        req.body.status
    ]
    const query = "INSERT INTO blood_bank(`blood_group`, `status`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateBloodBank = (req, res)=>{
    const values = [
        req.body.blood_group,
        req.body.status
    ]
    const updateId = req.params.id;
    const query = "UPDATE blood_bank SET blood_group=?, status=? WHERE blood_bank_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeBloodBank = (req, res)=>{

    const query = "DELETE FROM blood_bank WHERE blood_bank_id = ?";
    const blood_bankId = req.params.id;

    db.query(query, [blood_bankId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

// BLOOD DONOR BACKEND CODE HERE

export const getBloodDonorList = (req, res) =>{
    const query = "SELECT * FROM blood_donor";

    db.query(query, (err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const getBloodDonor = (req, res) =>{
    const query = "SELECT * FROM blood_donor WHERE blood_donor_id=?";

    db.query(query,[req.params.id],(err, data)=>{
        if(err) return res.status(500).json("Internal server error");

        return res.status(200).json((data))
    })
}

export const addBloodDonor = (req, res)=>{
    const values = [
        req.body.name,
        req.body.email,
        req.body.address, 
        req.body.phone, 
        req.body.sex, 
        req.body.age, 
        req.body.blood_group, 
        req.body.last_donation_date
    ]
    const query = "INSERT INTO blood_donor(`name`, `email`, `address`, `phone`, `sex`, `age`, `blood_group`, `last_donation_date`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateBloodDonor = (req, res)=>{
    const values = [
        req.body.name,
        req.body.email,
        req.body.address, 
        req.body.phone, 
        req.body.sex, 
        req.body.age, 
        req.body.blood_group, 
        req.body.last_donation_date
    ]
    const updateId = req.params.id;
    const query = "UPDATE blood_donor SET name =?, email =?, address =?, phone =?, sex =?, age =?, blood_group =?, last_donation_date =? WHERE blood_donor_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeBloodDonor = (req, res)=>{

    const query = "DELETE FROM blood_donor WHERE blood_donor_id = ?";
    const blood_donorId = req.params.id;

    db.query(query, [blood_donorId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}