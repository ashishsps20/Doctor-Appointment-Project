import express from 'express'
import {
	registerUser,
	loginUser,
	getProfile,
	bookAppointment,
	listAppointments,
	cancelAppointment,
	paymentRazorpay,
	verifyRazorpay
} from '../controllers/userController.js'
import { authUser } from '../middlewares/authUser.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/book-appointment', bookAppointment)
userRouter.get('/appointment', listAppointments)
userRouter.post('/cancel-appointment', cancelAppointment)
userRouter.post('/payment-razorpay', paymentRazorpay)
userRouter.post('/verify-razorpay', verifyRazorpay)

export default userRouter