import express from "express"
import { 
         addBloodBank, addBloodDonor, 
         getBloodBank, 
         getBloodBankList, getBloodDonor, 
         getBloodDonorList, 
         removeBloodBank, removeBloodDonor, 
         updateBloodBank, updateBloodDonor 
        } from "../controllers/bloodBank.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router()

router.get("/blood_bank_list", authenticateToken, getBloodBankList);
router.get("/blood_bank/:id", authenticateToken, getBloodBank);
router.post("/add_blood_bank", authenticateToken, addBloodBank);
router.put("/update_blood_bank/:id", authenticateToken, updateBloodBank);
router.delete("/remove_blood_bank/:id", authenticateToken, removeBloodBank);

// BLOOD DONOR ROUTE DEFFINITION HERE
router.get("/blood_donors", authenticateToken, getBloodDonorList);
router.get("/blood_donor/:id", authenticateToken, getBloodDonor);
router.post("/add_blood_donor", authenticateToken, addBloodDonor);
router.put("/update_blood_donor/:id", authenticateToken, updateBloodDonor);
router.delete("/remove_blood_donor/:id", authenticateToken, removeBloodDonor);

export default router;