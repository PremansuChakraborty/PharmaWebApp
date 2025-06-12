import express from 'express';
import cors from 'cors'
import userRouter from '../routes/user.routes.js';
import medicineRouter from '../routes/medicine.routes.js'
import doctoreRouter from '../routes/doctor.routes.js'
import chatbotRouter from '../routes/chatbot.routes.js'
import ambulanceRouter from "../routes/ambulance.routes.js"
import addressRouter from "../routes/address.routes.js"
import orderRouter from "../routes/order.routes.js"
import  {configDotenv} from 'dotenv';
import connectDB from '../db.js';
import path from 'path'
import {httpServer,app} from '../lib/socket.js';
import cookieParser from 'cookie-parser';
configDotenv()
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}));
app.use(cookieParser())
 app.use(express.static(path.join(path.resolve(),"../Frontend/dist")))
 app.use(express.json());
 const port=process.env.PORT
app.use('/api/v1/user',userRouter)
app.use('/api/v1/medicine',medicineRouter)
app.use('/api/v1/doctor',doctoreRouter)
app.use('/api/v1/chatbot',chatbotRouter)
app.use('/api/v1/ambulance',ambulanceRouter)
app.use('/api/v1/address',addressRouter)
app.use('/api/v1/order',orderRouter)
connectDB().then(()=>{
  httpServer.listen(port, () => {
    console.log(`${port} connected`);
  });
}).catch(err=>console.log(err.message))
