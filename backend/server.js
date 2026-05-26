import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoose.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
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
app.get('/',(req,res)=>{
    res.send("API working");
})
app.listen(port,()=>{
     console.log("Server started at http://localhost:4000");
})