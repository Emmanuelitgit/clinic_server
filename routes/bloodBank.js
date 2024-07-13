import express from "express"
import { 
         addBloodBank, addBloodDonor, 
         getBloodBank, 
         getBloodBankList, getBloodDonor, 
         getBloodDonorList, 
         removeBloodBank, removeBloodDonor, 
         updateBloodBank, updateBloodDonor 
        } from "../controllers/bloodBank.js";

const router = express.Router()

router.get("/blood_bank_list", getBloodBankList);
router.get("/blood_bank/:id", getBloodBank);
router.post("/add_blood_bank", addBloodBank);
router.put("/update_blood_bank/:id", updateBloodBank);
router.delete("/remove_blood_bank/:id", removeBloodBank);

// BLOOD DONOR ROUTE DEFFINITION HERE
router.get("/blood_donors", getBloodDonorList);
router.get("/blood_donor/:id", getBloodDonor);
router.post("/add_blood_donor", addBloodDonor);
router.put("/update_blood_donor/:id", updateBloodDonor);
router.delete("/remove_blood_donor/:id", removeBloodDonor);

export default router;