import  db  from "../db.js";
import jwt from "jsonwebtoken";
import upload from "../middleware/multer.js";


// STAFF HERE
export const getStaffList = (req, res)=>{
    const query = "SELECT * FROM staff WHERE role=?";

    db.query(query, [req.params.role], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

export const getStaff = (req, res)=>{
    const query = "SELECT * FROM staff WHERE staff_id=?";

    db.query(query, [req.params.id], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

export const getAllStaff = (req, res)=>{
    const query = "SELECT * FROM staff";

    db.query(query, [req.params.role], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

export const addStaff = (req, res)=>{
    const values = [
        req.body.name,
        req.body.role,
        req.body.phone,
        req.body.address,
        req.body.email,
        req.body.password,
        req.body.department,
        req.body.profile
    ]
    const query = "INSERT INTO staff(`name`, `role`, `phone`, `address`, `email`, `password`, `department`, `profile`) VALUES(?)";

    db.query(query, [values], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateStaff = (req, res)=>{
    const values = [
        req.body.name,
        req.body.role,
        req.body.phone,
        req.body.address,
        req.body.email,
        req.body.password,
        req.body.department,
        req.body.profile
    ]
    const updateId = req.params.id;
    const query = "UPDATE staff SET name=?, role=?, phone=?, address=?, email=?, password=?, department=?, profile=? WHERE staff_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeStaff = (req, res)=>{

    const query = "DELETE FROM staff WHERE staff_id = ?";
    const staffId = req.params.id;

    db.query(query, [staffId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

// DEPARTMENT HERE

export const getDepartmentList = (req, res)=>{
    const query = "SELECT * FROM department";

    db.query(query,(err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

export const getDepartment = (req, res)=>{
    const query = "SELECT * FROM department WHERE department_id=?";

    db.query(query,[req.params.id],(err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}

export const addDepartment = (req, res)=>{

    const {name, description} = req.body
    const query = "INSERT INTO department(`name`, `description`) VALUES(?,?)";

    db.query(query,[name,description], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const updateDepartment = (req, res)=>{
    const values = [
        req.body.name,
        req.body.description
    ]
    const updateId = req.params.id;
    const query = "UPDATE department SET name=?, description=? WHERE department_id=?";

    db.query(query, [...values, updateId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(201).json(data)
    })
}

export const removeDepartment = (req, res)=>{
    const query = "DELETE FROM department WHERE department_id = ?";
    const departmentId = req.params.id

    db.query(query, [departmentId], (err, data) => {
        if (err) return res.send(err)
        
        return res.status(200).json(data)
    })
}