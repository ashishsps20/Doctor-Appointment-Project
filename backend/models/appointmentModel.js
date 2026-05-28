import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

  userId: { type: String, required: true },
  docId: { type: String, required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },

  // Snapshot of data at the time of booking
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },

  amount: { type: Number, required: true },
  date: { type: Number, required: true }, // Timestamp when appointment was booked

  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },// Will turn true after Razorpay/Stripe success
  isCompleted: { type: Boolean, default: false }

})

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model('appointment', appointmentSchema)

export default appointmentModel