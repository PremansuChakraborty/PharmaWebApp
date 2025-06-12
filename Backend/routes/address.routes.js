import { Router } from "express";
import { addAddress, getAddress } from "../controllers/address.controllers.js";
import { tokenVerification } from "../middleware/user.middleware.js";


const router=Router()
router.post('/addAddress',tokenVerification,addAddress);
router.get('/getAddresses',tokenVerification,getAddress)

export default router;