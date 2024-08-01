import express from "express"
import { addPatient, 
         addVital, 
         getPatient, 
         getVital, 
         getVitalList, 
         patientList, 
         removePatient, 
         removeVital, 
         updatePatient,
         updateVital} from "../controllers/patient.js"
import { authenticateToken } from "../middleware/authToken.js";
         
const router = express.Router()

router.get("/patients", authenticateToken,patientList);
router.get("/patient/:id", authenticateToken, getPatient);
router.post("/add_patient", authenticateToken, addPatient);
router.put("/update_patient/:id", authenticateToken, updatePatient);
router.delete("/remove_patient/:id", authenticateToken, removePatient);

// VITAL ROUTES HERE
router.get("/vitals", authenticateToken,  getVitalList);
router.get("/vital/:id", authenticateToken,getVital);
router.post("/add_vital", authenticateToken, addVital);
router.put("/update_vital/:id", authenticateToken, updateVital);
router.delete("/remove_vital/:id", authenticateToken, removeVital);

export default router;