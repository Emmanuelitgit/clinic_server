import express from "express";
import { 
        addMedicine,
        addMedicineCategory,
        addPrescription, 
        getMedicine, 
        getMedicineCategories, 
        getMedicineCategory, 
        getMedicineList, 
        getPrescription, 
        getPrescriptions, 
        getPrescriptionsCountForDashBox, 
        removeMedicine, 
        removeMedicineCategory, 
        removePrescription, 
        updateMedicine, 
        updateMedicineCategory, 
        updatePrescription, 
        updateStatus} from "../controllers/medication.js";
 import { authenticateToken } from "../middleware/authToken.js";


const router = express.Router()

router.get("/prescriptions", authenticateToken, getPrescriptions);
router.get("/prescriptions/count", authenticateToken, getPrescriptionsCountForDashBox);
router.get("/prescription/:id", authenticateToken, getPrescription);
router.post("/add_prescription", authenticateToken, addPrescription);
router.put("/update_prescription/:id", authenticateToken, updatePrescription);
router.put("/update_medication_status/:id", authenticateToken, updateStatus);
router.delete("/remove_prescription/:id", authenticateToken, removePrescription);


// MEDICINE CATEGORY ROUTES HERE
router.get("/medicine_categories", authenticateToken, getMedicineCategories);
router.get("/medicine_category/:id", authenticateToken, getMedicineCategory);
router.post("/add_category", authenticateToken, addMedicineCategory);
router.put("/update_category/:id", authenticateToken, updateMedicineCategory);
router.delete("/remove_category/:id", authenticateToken, removeMedicineCategory);

// MEDICINE ROUTES HERE
router.get("/medicine_list", authenticateToken, getMedicineList);
router.get("/medicine/:id", authenticateToken, getMedicine);
router.post("/add_medicine", authenticateToken, addMedicine);
router.put("/update_medicine/:id", authenticateToken, updateMedicine);
router.delete("/remove_medicine/:id", authenticateToken, removeMedicine);

export default router;