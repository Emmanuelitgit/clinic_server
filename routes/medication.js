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
        

const router = express.Router()

router.get("/prescriptions", getPrescriptions);
router.get("/prescriptions/count", getPrescriptionsCountForDashBox);
router.get("/prescription/:id", getPrescription);
router.post("/add_prescription", addPrescription);
router.put("/update_prescription/:id", updatePrescription);
router.put("/update_medication_status/:id", updateStatus);
router.delete("/remove_prescription/:id", removePrescription);


// MEDICINE CATEGORY ROUTES HERE
router.get("/medicine_categories", getMedicineCategories);
router.get("/medicine_category/:id", getMedicineCategory);
router.post("/add_category", addMedicineCategory);
router.put("/update_category/:id", updateMedicineCategory);
router.delete("/remove_category/:id", removeMedicineCategory);

// MEDICINE ROUTES HERE
router.get("/medicine_list", getMedicineList);
router.get("/medicine/:id", getMedicine);
router.post("/add_medicine", addMedicine);
router.put("/update_medicine/:id", updateMedicine);
router.delete("/remove_medicine/:id", removeMedicine);

export default router;