import db from "../db.js";
import jwt from "jsonwebtoken";
import upload from "../middleware/multer.js";

// STAFF HERE
export const getStaffList = async (req, res) => {
  const query = "SELECT * FROM staff WHERE role=?";

  try {
    const [rows] = await db.query(query, [req.params.role]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getStaff = async (req, res) => {
  const query = "SELECT * FROM staff WHERE staff_id=?";

  try {
    const [rows] = await db.query(query, [req.params.id]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getAllStaff = async (req, res) => {
  const query = "SELECT * FROM staff";

  try {
    const [rows] = await db.query(query);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addStaff = async (req, res) => {
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
  const query = "INSERT INTO staff(`name`, `role`, `phone`, `address`, `email`, `password`, `department`, `profile`) VALUES(?)";

  try {
    const [result] = await db.query(query, [values]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
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

  try {
    const [result] = await db.query(query, [...values, updateId]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const removeStaff = async (req, res) => {
  const query = "DELETE FROM staff WHERE staff_id = ?";
  const staffId = req.params.id;

  try {
    const [result] = await db.query(query, [staffId]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// DEPARTMENT HERE

export const getDepartmentList = async (req, res) => {
  const query = "SELECT * FROM department";

  try {
    const [rows] = await db.query(query);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getDepartment = async (req, res) => {
  const query = "SELECT * FROM department WHERE department_id=?";

  try {
    const [rows] = await db.query(query, [req.params.id]);
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const addDepartment = async (req, res) => {
  const { name, description } = req.body;
  const query = "INSERT INTO department(`name`, `description`) VALUES(?,?)";

  try {
    const [result] = await db.query(query, [name, description]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateDepartment = async (req, res) => {
  const values = [
    req.body.name,
    req.body.description
  ];
  const updateId = req.params.id;
  const query = "UPDATE department SET name=?, description=? WHERE department_id=?";

  try {
    const [result] = await db.query(query, [...values, updateId]);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const removeDepartment = async (req, res) => {
  const query = "DELETE FROM department WHERE department_id = ?";
  const departmentId = req.params.id;

  try {
    const [result] = await db.query(query, [departmentId]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};