import express from "express";
import { getDepartment,
         getDepartmentList, 
         addDepartment, 
         addStaff, 
         removeStaff, 
         removeDepartment, 
         updateStaff, 
         updateDepartment, 
         getAllStaff, 
         getStaffList, 
         getStaff} from "../controllers/staff.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router();

router.get("/staff/:role", authenticateToken, getStaffList);
router.get("/single_staff/:id", authenticateToken, getStaff);
router.get("/all_staff", authenticateToken, getAllStaff);
router.put("/update_staff/:id", authenticateToken, updateStaff);
router.post("/add_staff", authenticateToken, addStaff);
router.delete("/remove_staff/:id", authenticateToken, removeStaff);

// DEPARTMENT ROUTE HERE
router.get("/departments", authenticateToken, getDepartmentList);
router.get("/department/:id", authenticateToken, getDepartment);
router.post("/add_department", authenticateToken, addDepartment);
router.put("/update_department/:id", authenticateToken, updateDepartment);
router.delete("/remove_department/:id", authenticateToken, removeDepartment);

export default router; 