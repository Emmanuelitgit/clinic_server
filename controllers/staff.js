import db from "../db.js";
import jwt from "jsonwebtoken";
import upload from "../middleware/multer.js";
import bcrypt from "bcryptjs";


// STAFF HERE
export const getStaffList = async (req, res) => {
  const query = "SELECT * FROM staff WHERE role=?";
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await db.query(query, [req.params.role]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }finally{
    if(connection) connection.release()
  }
};

export const getStaff = async (req, res) => {
  const query = "SELECT * FROM staff WHERE staff_id=?";
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await db.query(query, [req.params.id]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }finally{
    if(connection) connection.release()
  }
};

export const getAllStaff = async (req, res) => {
  const query = "SELECT * FROM staff";
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await db.query(query);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }finally{
    if(connection) connection.release()
  }
};


export const addStaff = async (req, res) => {
  const {
    name,
    role,
    phone,
    address,
    email,
    password,
    department,
    profile
  } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const values = [
      name,
      role,
      phone,
      address,
      email,
      hashedPassword, 
      department,
      profile
    ];

    const query = "INSERT INTO staff(name, role, phone, address, email, password, department, profile) VALUES(?)";

    let connection;
    try {
      connection = await db.getConnection();
      const [result] = await db.query(query, [values]);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json(err);
    } finally {
      if (connection) connection.release();
    }
  } catch (err) {
    return res.status(500).json({ message: "Error hashing password", error: err });
  }
};


export const updateStaff = async (req, res) => {
  const values = [
    req.body.name,
    req.body.role,
    req.body.phone,
    req.body.address,
    req.body.email,
    req.body.password,
    req.body.department,
    req.body.profile
  ];
  const updateId = req.params.id;
  const query = "UPDATE staff SET name=?, role=?, phone=?, address=?, email=?, password=?, department=?, profile=? WHERE staff_id=?";
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await db.query(query, [...values, updateId]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }finally{
    if(connection) connection.release()
  }
};

export const removeStaff = async (req, res) => {
  const query = "DELETE FROM staff WHERE staff_id = ?";
  const staffId = req.params.id;
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await db.query(query, [staffId]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }finally{
    if(connection) connection.release()
  }
};

// DEPARTMENT HERE

export const getDepartmentList = async (req, res) => {
  const query = "SELECT * FROM department";
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await db.query(query);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }finally{
    if(connection) connection.release()
  }
};

export const getDepartment = async (req, res) => {
  const query = "SELECT * FROM department WHERE department_id=?";
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await db.query(query, [req.params.id]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }finally{
    if(connection) connection.release()
  }
};

export const addDepartment = async (req, res) => {
  const { name, description } = req.body;
  const query = "INSERT INTO department(`name`, `description`) VALUES(?,?)";
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await db.query(query, [name, description]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }finally{
    if(connection) connection.release()
  }
};

export const updateDepartment = async (req, res) => {
  const values = [
    req.body.name,
    req.body.description
  ];
  const updateId = req.params.id;
  const query = "UPDATE department SET name=?, description=? WHERE department_id=?";
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await db.query(query, [...values, updateId]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }finally{
    if(connection) connection.release()
  }
};

export const removeDepartment = async (req, res) => {
  const query = "DELETE FROM department WHERE department_id = ?";
  const departmentId = req.params.id;
  let connection;
  try {
    connection = await db.getConnection();
    const [result] = await db.query(query, [departmentId]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }finally{
    if(connection) connection.release()
  }
};


// import  db  from "../db.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // STAFF HERE
// export const getStaffList = (req, res)=>{
//     const query = "SELECT * FROM staff WHERE role=?";

//     db.query(query, [req.params.role], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }

// export const getStaff = (req, res)=>{
//     const query = "SELECT * FROM staff WHERE staff_id=?";

//     db.query(query, [req.params.id], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }

// export const getAllStaff = (req, res)=>{
//     const query = "SELECT * FROM staff";

//     db.query(query, [req.params.role], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }

// export const addStaff = (req, res)=>{
//     //CHECK EXISTING USER
//     const query = "SELECT * FROM staff WHERE email = ?"
//     const{email} = req.body

//     db.query(query, [email], (err, data)=>{
//         if(err) return res.json(err);
//         if(data.length) return res.status(409).json("User already exist");

//         //Hash the password and create a user
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);

//         const values = [
//             req.body.name,
//             req.body.role,
//             req.body.phone,
//             req.body.address,
//             req.body.email,
//             hash,
//             req.body.department,
//         ]
//         const query = "INSERT INTO staff(`name`, `role`, `phone`, `address`, `email`, `password`, `department`) VALUES(?)";

//         db.query(query, [values], (err, data)=>{
//             if(err) return res.json(err);
//             // if(!req.userId) return res.status(401).json("Unauthenticated")
//             return res.status(201).json(data);
//         })
//     }) 

// }

// export const updateStaff = (req, res)=>{
//     const values = [
//         req.body.name,
//         req.body.role,
//         req.body.phone,
//         req.body.address,
//         req.body.email,
//         req.body.password,
//         req.body.department
//     ]
//     const updateId = req.params.id;
//     const query = "UPDATE staff SET name=?, role=?, phone=?, address=?, email=?, password=?, department=? WHERE staff_id=?";

//     db.query(query, [...values, updateId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const removeStaff = (req, res)=>{

//     const query = "DELETE FROM staff WHERE staff_id = ?";
//     const staffId = req.params.id;

//     db.query(query, [staffId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }

// // DEPARTMENT HERE

// export const getDepartmentList = (req, res)=>{
//     const query = "SELECT * FROM department";

//     db.query(query,(err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }

// export const getDepartment = (req, res)=>{
//     const query = "SELECT * FROM department WHERE department_id=?";

//     db.query(query,[req.params.id],(err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }

// export const addDepartment = (req, res)=>{

//     const {name, description} = req.body
//     const query = "INSERT INTO department(`name`, `description`) VALUES(?,?)";

//     db.query(query,[name,description], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const updateDepartment = (req, res)=>{
//     const values = [
//         req.body.name,
//         req.body.description
//     ]
//     const updateId = req.params.id;
//     const query = "UPDATE department SET name=?, description=? WHERE department_id=?";

//     db.query(query, [...values, updateId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(201).json(data)
//     })
// }

// export const removeDepartment = (req, res)=>{
//     const query = "DELETE FROM department WHERE department_id = ?";
//     const departmentId = req.params.id

//     db.query(query, [departmentId], (err, data) => {
//         if (err) return res.send(err)
        
//         return res.status(200).json(data)
//     })
// }