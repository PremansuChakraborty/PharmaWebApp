import { Router } from "express";
import { chatReply } from "../controllers/chatbot.controllers.js";

const router=Router();

router.post('/response',chatReply)

export default router