import express from "express"
import {addMessage, getMessages} from "../controllers/messages.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router()

router.post("/add-message", authenticateToken, addMessage)
router.get("/messages", authenticateToken, getMessages)

export default router;