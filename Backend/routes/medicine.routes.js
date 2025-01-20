import {Router} from 'express'
import { addMedicine, getMedicine, medicineCollection } from '../controllers/medicine.controllers.js';

const router=Router();
 router.post('/addMedicine',addMedicine)
 router.post('/getMedicine',getMedicine)
 router.get('/allMedicine', medicineCollection)

 export default router