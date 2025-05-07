import { Router } from "express";
import { signup,login, addToCart, getCart, reduceCount, deleteProduct } from "../controllers/user.controllers.js";
const router=Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/addToCart',addToCart)
router.post('/getCart',getCart)
router.post('/reduceCount',reduceCount)
router.post('/deleteProduct',deleteProduct)

export default router;