import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";

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

export  {bookAppointment};