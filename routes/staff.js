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

const router = express.Router();

router.get("/staff/:role", getStaffList);
router.get("/single_staff/:id", getStaff);
router.get("/all_staff", getAllStaff);
router.put("/update_staff/:id", updateStaff);
router.post("/add_staff", addStaff);
router.delete("/remove_staff/:id", removeStaff);

// DEPARTMENT ROUTE HERE
router.get("/departments", getDepartmentList);
router.get("/department/:id", getDepartment);
router.post("/add_department", addDepartment);
router.put("/update_department/:id", updateDepartment);
router.delete("/remove_department/:id", removeDepartment);

export default router; 