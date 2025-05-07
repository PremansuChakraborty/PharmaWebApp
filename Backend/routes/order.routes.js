import {Router} from 'express';
import { addOrders, getOrderById, getOrders } from '../controllers/order.controllers.js';


const router=Router();
 router.post('/getOrder',getOrders)
 router.post('/getOrderById',getOrderById)
 router.post('/addOrder',addOrders)

 export default router