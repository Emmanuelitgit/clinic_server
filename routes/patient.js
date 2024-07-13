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

const router = express.Router()

router.get("/patients", patientList);
router.get("/patient/:id", getPatient);
router.post("/add_patient", addPatient);
router.put("/update_patient/:id", updatePatient);
router.delete("/remove_patient/:id", removePatient);

// VITAL ROUTES HERE
router.get("/vitals", getVitalList);
router.get("/vital/:id", getVital);
router.post("/add_vital", addVital);
router.put("/update_vital/:id", updateVital);
router.delete("/remove_vital/:id", removeVital);

export default router;