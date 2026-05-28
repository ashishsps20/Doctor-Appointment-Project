import express from "express";
import { authUser } from '../middlewares/authUser.js'
import {  getProfile, loginUser, registerUser,bookAppointment, listAppointments,cancelAppointment,paymentRazorpay,verifyRazorpay} from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile',authUser, getProfile)

userRouter.post("/book-appointment",authUser, bookAppointment);
userRouter.get("/appointment", authUser, listAppointments);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/verify-razorpay", authUser, verifyRazorpay);


export default userRouter;