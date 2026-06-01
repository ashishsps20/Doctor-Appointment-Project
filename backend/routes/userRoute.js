import express from "express";
import { authUser } from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
import { getProfile, loginUser, registerUser,updateProfile,
	       bookAppointment, listAppointments,cancelAppointment,
				 paymentRazorpay,verifyRazorpay} from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)

userRouter.post("/book-appointment",authUser, bookAppointment);
userRouter.get("/appointment", authUser, listAppointments);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/verify-razorpay", authUser, verifyRazorpay);


export default userRouter
