import { Router } from "express";
import { addAmbulance, ambulanceCollection, getAmbulance } from "../controllers/ambulance.controllers.js";



const router=Router();
 router.post('/addAmbulance',addAmbulance)
 router.post('/getAmbulance',getAmbulance)
 router.get('/allAmbulance', ambulanceCollection)

 export default router
