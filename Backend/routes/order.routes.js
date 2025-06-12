import {Router} from 'express';
import { addOrders, getOrderById, getOrders } from '../controllers/order.controllers.js';
import { tokenVerification } from '../middleware/user.middleware.js';


const router=Router();
 router.get('/getOrder',tokenVerification,getOrders)
 router.post('/getOrderById',getOrderById)
 router.post('/addOrder',tokenVerification,addOrders)

 export default router