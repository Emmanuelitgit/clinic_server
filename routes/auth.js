import express from "express";
import { login, verifyOtp } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login)
router.post("/verify-otp/:id", verifyOtp)

export default router; 