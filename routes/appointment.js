import express from "express";
import { addAppointment, getAppointment, getAppointmentList, removeAppointment, updateAppointment } from "../controllers/appointment.js";

const router = express.Router()


router.get("/appointments", getAppointmentList);
router.get("/appointment/:id", getAppointment);
router.post("/add_appointment", addAppointment);
router.put("/update_appointment/:id", updateAppointment);
router.delete("/remove_appointment/:id", removeAppointment);

export default router;