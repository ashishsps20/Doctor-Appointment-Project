import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        // Step 1: Fetch doctor data (except password)
        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' });
        }

        // Step 2: Get current booked slots
        let slots_booked = docData.slots_booked;

        // Step 3: Checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        // Step 4: Fetch user data (except password)
        const userData = await userModel.findById(userId).select('-password');
       

        // Step 5: Clean up docData before saving snapshot
        delete docData.slots_booked;

        // Step 6: Create Appointment Data Snapshot
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fee,
            slotTime,
            slotDate,
            date: Date.now()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Step 7: Save new slots data back to Doctor Model
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: 'Appointment Booked' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// API TO GET USER APPOINTMENTS FOR FRONTEND MY-APPPOINTMENTS PAGE
const listAppointments = async (req, res) => {
    try {
        const {userId} = req.body;
        const appointments = await appointmentModel.find({userId})

        res.json({success: true, appointments})

    } catch (error) {
        console.log(error);      
        res.json({ success: false, message: error.message });
    }
}

// API TO CANCEL APPOINTMENT
const cancelAppointment = async (req, res) => {
    try {
        const {userId,appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        // Authorization Check: Only the user who booked the appointment can cancel it
        if(userId !== appointmentData.userId){
            return res.json({success: false, message: 'Unauthorized'})
        }
        
        // if patient already cancelled then return success true with message already cancelled
        if(appointmentData.cancelled){
            return res.json({success: true, message: 'Appointment already cancelled'})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

        //free the slot in doctor model
        const {docId,slotDate,slotTime} = appointmentData;

        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked;

        // Remove the cancelled slot from doctor's booked slots
        if(slots_booked[slotDate]){
            slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
            await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        }

        res.json({success: true, message: 'Appointment Cancelled'})
    } catch (error) {
        console.log(error);      
        res.json({ success: false, message: error.message });
    }
}

// API TO MAKE PAYMENT OF APPOINTMENT USNG RAZORPAY.
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if(!appointmentData || appointmentData.cancelled){
            return res.json({success: false, message: 'Invalid Appointment or cancelled'})
        }

        // create options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100, // amount in paise
            currency: process.env.RAZORPAY_CURRENCY,
            receipt: appointmentId
        };
        //create order in razorpay
        const order = await razorpayInstance.orders.create(options);

        res.json({ success: true, order });

    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const verifyRazorpay = async (req, res) => {
    try {
       const { razorpay_order_id} = req.body
       const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id); // razorpay ke server se order ki details fetch karna

       //testing ke liye use ,i m using (orderInfo.status === 'paid' || orderInfo.status === 'created')
       if(orderInfo.status === 'paid'){
            // update appointment payment status to true
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            res.json({success: true, message: 'Payment Successful'})
       } else {
        res.json({success: false, message: 'Payment not successful'})
       }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export  {bookAppointment, listAppointments,cancelAppointment, paymentRazorpay, verifyRazorpay};