
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
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.status(200).json({ success: true, message: "Doctor availability changed successfully" })
    }
    catch (error) {
        console.error('Change availability error:', error?.message || error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const doctorsList = async (req, res) => {
    try {
        const doctors = await doctorModel.find().select(['-password','-email']).sort({ date: -1 }) 
        res.status(200).json({ success: true, doctors })
    } catch (error) {
        console.error('Get doctors list error:', error?.message || error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// API for doctor Login
export const loginDoctor = async (req, res) => {

    try{

        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor){
            return res.json({success: false, message:'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if (!isMatch){
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success: false, message:'Invalid credentials'})
        }

    }catch(error){
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
export const appointmentComplete = async (req,res) => {
    try {
        const { docId, appointmentId } = req.body
        
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({success: true,message: 'Appointment Completed'})
        }else{
            return res.json({success: false,message: 'Mark failed'})
        }

    } catch (error) {
        console.error(error?.message || error)
        res.json({ success: false, message: error.message })
    }
}

// API to Cancel appointment for doctor panel
export const appointmentCancel = async (req,res) => {
    try {
        const { docId, appointmentId } = req.body
        
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({success: true,message: 'Appointment Cancelled'})
        }else{
            return res.json({success: false,message: 'Cancellation failed'})
        }

    } catch (error) {
        console.error(error?.message || error)
        res.json({ success: false, message: error.message })
    }
}


// API to get dashBoard data for doctor panel
export const doctorDashboard = async (req, res) => {
    
    try {
        const {docId} = req.body

        const appointments = await appointmentModel.find({docId})
        
        let earnings = 0;
        appointments.map((item)=>{
            if (item.isCompleted || item.payment){
                earnings += item.amount
            }
        })
        let patients = []
        appointments.map((item)=>{
            if (!patients.includes(item.UserId)){
                patients.push(item.UserId)
            }
        })
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success: true, dashData})

    } catch (error) {
        console.error(error?.message || error)
        res.json({ success: false, message: error.message })
    }
}