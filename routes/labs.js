import express from "express"
import { 
        addLabResult,
        addRequest, 
        getLabResult, 
        getLabResultList, 
        getRequest, 
        getRequests, 
        removeLabResult, 
        removeRequest, 
        updateLabResult, 
        updateRequest,
        updateStatus,
        getAllRequestsForDoctors,
       getLabResultListForDoctors} from "../controllers/labs.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router()

// LAB REQUEST ROUTES HERE
router.get("/requests/:request_type", authenticateToken, getRequests);
router.get("/requests/", authenticateToken, getAllRequestsForDoctors);
router.get("/request/:id", authenticateToken, getRequest);
router.post("/add_request", authenticateToken, addRequest);
router.put("/update_request/:id", authenticateToken, updateRequest);
router.put("/update_lab_status/:id", authenticateToken, updateStatus);
router.delete("/remove_request/:id", authenticateToken, removeRequest);

// LAB RESULT ROUTES HERE
router.get("/lab_result_list/:request_type", authenticateToken, getLabResultList);
router.get("/lab_result_list/", authenticateToken, getLabResultListForDoctors);
router.get("/lab_result/:id", authenticateToken, getLabResult);
router.post("/add_lab_result", authenticateToken, addLabResult);
router.put("/update_lab_result/:id", authenticateToken, updateLabResult);
router.delete("/remove_lab_result/:id", authenticateToken, removeLabResult);

export default router;