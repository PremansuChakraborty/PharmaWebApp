import express from 'express';
import cors from 'cors'
import userRouter from '../routes/user.routes.js';
import medicineRouter from '../routes/medicine.routes.js'
import doctoreRouter from '../routes/doctor.routes.js'
import chatbotRouter from '../routes/chatbot.routes.js'
import  {configDotenv} from 'dotenv';
import connectDB from '../db.js';
const app=express()
configDotenv()
app.use(cors({
  origin: "*",
  credentials:true
}));
// app.use(express.static(path.join(path.resolve(),"../Frontend/dist")))
app.use(express.json());
const port=process.env.PORT
app.use('/api/v1/user',userRouter)
app.use('/api/v1/medicine',medicineRouter)
app.use('/api/v1/doctor',doctoreRouter)
app.use('/api/v1/chatbot',chatbotRouter)
connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`${port} connected`);
  });
}).catch(err=>console.log(err.message))
