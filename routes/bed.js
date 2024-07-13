import express from "express";
import { 
      addBed, 
      addBedAllotment, 
      getBed, 
      getBedAllotment, 
      removeBed, 
      removeBedAllotment, 
      updateBed, 
      updateBedAllotment,
      getBedAllotmentList, 
      getBedList} from "../controllers/bed.js";

const router = express.Router()


router.get("/beds", getBedList);
router.get("/bed/:id", getBed);
router.post("/add_bed", addBed);
router.put("/update_bed/:id", updateBed);
router.delete("/remove_bed/:id", removeBed);

// BED ALLOTMENT ROUTE DEFINITION HERE

router.get("/bed_allotments", getBedAllotmentList);
router.get("/bed_allotment/:id", getBedAllotment);
router.post("/add_bed_allotment", addBedAllotment);
router.put("/update_bed_allotment/:id", updateBedAllotment);
router.delete("/remove_bed_allotment/:id", removeBedAllotment);

export default router;