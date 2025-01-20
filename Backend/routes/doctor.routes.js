import {Router} from 'express'
import { addDoctor, doctorCollection, getDoctor } from '../controllers/doctor.controllers.js';


const router=Router();
 router.post('/addDoctor',addDoctor)
 router.post('/getDoctor',getDoctor)
 router.get('/allDoctors', doctorCollection)

 export default router