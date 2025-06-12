import { Router } from "express";
import { signup,login, addToCart, getCart, reduceCount, deleteProduct, checkauth, logout } from "../controllers/user.controllers.js";
import { tokenVerification } from "../middleware/user.middleware.js";
const router=Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/addToCart',tokenVerification,addToCart)
router.post('/reduceCount',tokenVerification,reduceCount)
router.post('/deleteProduct',tokenVerification,deleteProduct)
router.get('/getCart',tokenVerification,getCart)
router.get('/checkAuth',tokenVerification,checkauth)
router.get('/logout',logout)

export default router;