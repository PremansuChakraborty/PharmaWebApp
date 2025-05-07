import { Router } from "express";
import { addAddress, getAddress } from "../controllers/address.controllers.js";


const router=Router()
router.post('/addAddress',addAddress);
router.post('/getAddresses',getAddress)

export default router;