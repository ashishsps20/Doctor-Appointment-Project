import redisClient from '../config/redis.js';
import mongoose from 'mongoose'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        if (!docId) {
            return res.status(400).json({ success: false, message: 'Doctor id is required' })
        }
        if (!mongoose.Types.ObjectId.isValid(docId)) {
            return res.status(400).json({ success: false, message: 'Invalid doctor id' })
        }
        const docData = await doctorModel.findById(docId)
        if (!docData) {
            return res.status(404).json({ success: false, message: 'Doctor not found' })
        }
        // 1. Update in MongoDB
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        // 🌟 2. CACHE INVALIDATION (THE FIX) 🌟
        // Purani list Redis se delete kar do. Agli baar 'doctorsList' API khud naya data laakar Redis mein daal degi.
        await redisClient.del('all_doctors');
        
        res.status(200).json({ success: true, message: "Doctor availability changed successfully" })
    }
    catch (error) {
        console.error('Change availability error:', error?.message || error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const doctorsList = async (req, res) => {
    try {
        const cachedDoctors = await redisClient.get('all_doctors');
        
        if (cachedDoctors) {
            // console.log("⚡ Serving from Redis Cache! (Fast)");
            // Redis hamesha string save karta hai, isliye parse karna padega
            return res.json({ success: true, doctors: JSON.parse(cachedDoctors) }); 
        }
        
        // 🌟 2. Agar Redis khali hai, toh MongoDB (Database) ke paas jao
        // console.log("🐌 Serving from MongoDB Database! (Slow)");
        const doctors = await doctorModel.find().select(['-password', '-email']).sort({ date: -1 })
        
        // 🌟 3. Agli baar ke liye Redis mein save kar do (Expire in 3600 seconds = 1 Hour)
        await redisClient.setEx('all_doctors', 3600, JSON.stringify(doctors));
        res.status(200).json({ success: true, doctors })
    } catch (error) {
        console.error('Get doctors list error:', error?.message || error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// API for doctor Login
export const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign(
                { id: doctor._id }, 
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.error('Login error:', error?.message || error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor appointments for doctor panel
export const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })
        res.json({ success: true, appointments })

    } catch (error) {
        console.error(error?.message || error)
        res.json({ success: false, message: error.message })
    }
}

// API to mark appointment as completed for doctor panel
export const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        } else {
            return res.json({ success: false, message: 'Mark failed' })
        }

    } catch (error) {
        console.error(error?.message || error)
        res.json({ success: false, message: error.message })
    }
}

// API to Cancel appointment for doctor panel
export const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        } else {
            return res.json({ success: false, message: 'Cancellation failed' })
        }

    } catch (error) {
        console.error(error?.message || error)
        res.json({ success: false, message: error.message })
    }
}


// API to get dashBoard data for doctor panel
export const doctorDashboard = async (req, res) => {

    try {
        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0;
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })
        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.UserId)) {
                patients.push(item.UserId)
            }
        })
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.error(error?.message || error)
        res.json({ success: false, message: error.message })
    }
}

// API  to get doctor profile for Doctor panel
export const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({ success: true, profileData })

    } catch (error) {
        console.error(error?.message || error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor profile data from Doctor panel
export const updateDoctorProfile = async (req, res) => {

    try {

        const { docId, fee, address, available } = req.body

        await doctorModel.findByIdAndUpdate(docId, { fee, address, available })
        res.json({ success: true, message: 'Profile updated successfully' })

    } catch (error) {
        console.error(error?.message || error)
        res.json({ success: false, message: error.message })
    }
}