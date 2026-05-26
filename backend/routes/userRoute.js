import express from "express";
import { bookAppointment } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/book-appointment", bookAppointment);

export default userRouter;