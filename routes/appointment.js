import express from "express";
import { addAppointment, getAppointment, getAppointmentList, removeAppointment, updateAppointment } from "../controllers/appointment.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router()


router.get("/appointments", authenticateToken, getAppointmentList);
router.get("/appointment/:id", authenticateToken, getAppointment);
router.post("/add_appointment", authenticateToken, addAppointment);
router.put("/update_appointment/:id", authenticateToken, updateAppointment);
router.delete("/remove_appointment/:id", authenticateToken, removeAppointment);

export default router;