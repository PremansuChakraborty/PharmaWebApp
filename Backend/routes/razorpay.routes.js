import { Router } from "express";
// import { tokenVerification } from "../middleware/user.middleware.js";
import { razorfunction } from "../controllers/razorpay.controllers.js";
const router=Router();

router.post('/razorpay',razorfunction)

export default router;