import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import './config/redis.js'; // Redis connection ko initialize karne ke liye
import connectDB from './config/mongoose.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import aiRouter from './routes/aiRoute.js'
import chatbotRouter from './routes/chatbotRoute.js' // (new feature added in the project)



//  app configuration
const app = express();
const port = process.env.port || 4000
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api endpoints

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/ai', aiRouter) // (new feature added in the project)
app.use('/api/chat', chatbotRouter) // (new feature added in the project)
app.get('/',(req,res)=>{
    res.status(200).json({ success: true, message: "API working" })
})
app.listen(port,()=>{
     console.log("Server started at http://localhost:4000");
})