import express from "express";
import { bookAppointment, listAppointments,cancelAppointment,paymentRazorpay,verifyRazorpay} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/book-appointment", bookAppointment);
userRouter.get("/appointment", listAppointments);
userRouter.post("/cancel-appointment", cancelAppointment);
userRouter.post("/payment-razorpay", paymentRazorpay);
userRouter.post("/verify-razorpay", verifyRazorpay);

export default userRouter;